import { useState, useEffect, useRef } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import services from '../data/services';
import * as staffModule from '../data/staff';
import {
  API_BASE_URL,
  API_KEY,
  CONTACT_PHONE,
  OPEN_HOUR,
  CLOSE_HOUR,
  MAX_DAYS_AHEAD,
  TIMEZONE,
} from '../config';

// Kahit default export o named export ang staff.js, hindi magbabagsak ng page
const staff = staffModule.default || staffModule.staff || [];

// Naka-set ba ang backend URL at API key?
const isConfigured = Boolean(API_BASE_URL && API_KEY);

const pad2 = (n) => String(n).padStart(2, '0');

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Petsa at oras ngayon sa Pilipinas, kahit saan nakabukas ang browser
function manilaNow() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type).value;
  return { date: `${get('year')}-${get('month')}-${get('day')}`, time: `${get('hour')}:${get('minute')}` };
}

function addDays(ymd, n) {
  const [y, m, d] = ymd.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return `${t.getUTCFullYear()}-${pad2(t.getUTCMonth() + 1)}-${pad2(t.getUTCDate())}`;
}

function formatDate(ymd) {
  if (!ymd) return '';
  const [y, m, d] = ymd.split('-').map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return `${DAYS[weekday]}, ${MONTHS[m - 1]} ${d}, ${y}`;
}

// Oras-oras na slot: 08:00, 09:00, ... 17:00
const SLOTS = [];
for (let h = OPEN_HOUR; h < CLOSE_HOUR; h += 1) SLOTS.push(`${pad2(h)}:00`);

function slotLabel(t) {
  const h = Number(t.slice(0, 2));
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${t.slice(3)} ${h >= 12 ? 'PM' : 'AM'}`;
}

const ERROR_MESSAGES = {
  INVALID_NAME: 'Please enter your name.',
  INVALID_PHONE: 'Please check your phone number.',
  INVALID_EMAIL: 'That email address does not look right.',
  INVALID_SERVICE: 'Please choose a service.',
  INVALID_DATE: 'That date is not valid.',
  PAST_DATE: 'That date has already passed. Please pick another day.',
  TOO_FAR: `We accept bookings up to ${MAX_DAYS_AHEAD} days ahead.`,
  INVALID_TIME: 'That time is not valid.',
  CLOSED_TIME: 'That time is outside our opening hours.',
  PAST_TIME: 'That time has already passed. Please pick a later time.',
  SLOT_FULL: 'Sorry, that time slot is already full. Please choose another time.',
  RATE_LIMITED: 'Too many requests right now. Please try again in a little while.',
  BUSY: 'We are very busy right now. Please try again in a moment.',
};

// Aling hakbang babalikan kapag may mali sa isang field
const ERROR_STEP = {
  INVALID_SERVICE: 1,
  INVALID_NAME: 2,
  INVALID_PHONE: 2,
  INVALID_EMAIL: 2,
  INVALID_DATE: 3,
  PAST_DATE: 3,
  TOO_FAR: 3,
  INVALID_TIME: 3,
  CLOSED_TIME: 3,
  PAST_TIME: 3,
  SLOT_FULL: 3,
};

const IDLE_SLOTS = { status: 'idle', counts: {}, max: Infinity };

const fieldClass =
  'w-full bg-white border border-gray-200 p-3 rounded-xl text-slate-800 focus:border-[#C5A059] outline-none transition-all';
const labelClass = 'text-sm font-semibold text-gray-500 ml-1';

function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [slotsVersion, setSlotsVersion] = useState(0);
  const [slotInfo, setSlotInfo] = useState(IDLE_SLOTS);
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    staff: '',
    notes: '',
  });

  const openedAt = useRef(Date.now());
  const submittingRef = useRef(false);

  const stepLabels = ['Select a Service', 'Your Information', 'Preferred Schedule', 'Review Your Booking'];

  const now = manilaNow();
  const maxDate = addDays(now.date, MAX_DAYS_AHEAD);

  // ---------- Pag-check ng availability ng oras ----------
  useEffect(() => {
    if (!formData.date || !isConfigured) return undefined;
    let cancelled = false;
    const controller = new AbortController();
    setSlotInfo({ status: 'loading', counts: {}, max: Infinity });
    fetch(`${API_BASE_URL}/bookings/slots?date=${encodeURIComponent(formData.date)}`, {
      headers: { 'x-api-key': API_KEY },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error('slots-failed');
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data && data.ok) {
          const max = Number(data.max);
          setSlotInfo({ status: 'ready', counts: data.counts || {}, max: Number.isFinite(max) ? max : Infinity });
        } else {
          setSlotInfo({ status: 'error', counts: {}, max: Infinity });
        }
      })
      .catch(() => {
        if (!cancelled) setSlotInfo({ status: 'error', counts: {}, max: Infinity });
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [formData.date, slotsVersion]);

  const slots = formData.date && isConfigured ? slotInfo : IDLE_SLOTS;

  // ---------- Pag-validate sa browser (inuulit din ng server) ----------
  const phoneDigits = formData.phone.replace(/\D/g, '');
  const phoneOk = phoneDigits.length >= 7 && phoneDigits.length <= 15;
  const emailOk = !formData.email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const nameOk = formData.name.trim().length >= 2;

  let dateProblem = '';
  if (formData.date) {
    if (formData.date < now.date) dateProblem = 'That date has already passed.';
    else if (formData.date > maxDate) dateProblem = `We accept bookings up to ${MAX_DAYS_AHEAD} days ahead.`;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmitError('');
    setFormData((prev) => (name === 'date' ? { ...prev, date: value, time: '' } : { ...prev, [name]: value }));
  };

  const goNext = () => {
    setSubmitError('');
    setStep(step + 1);
  };
  const goBack = () => {
    setSubmitError('');
    setStep(step - 1);
  };

  const selectedService = services.find((s) => s.title === formData.service);

  // ---------- Pagpapadala ng booking ----------
  const handleConfirm = async () => {
    if (submittingRef.current) return; // iwas doble-click
    submittingRef.current = true;
    setSubmitting(true);
    setSubmitError('');

    const controller = new AbortController();
    // 60 segundo dahil minsan natutulog ang Render free tier at matagal gumising
    const timer = setTimeout(() => controller.abort(), 60000);
    try {
      if (!isConfigured) throw new Error('not-configured');

      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          service: formData.service,
          staff: formData.staff,
          date: formData.date,
          time: formData.time,
          notes: formData.notes.trim(),
          website: honeypot, // pang-bitag sa bot: dapat laging walang laman
          elapsed: Date.now() - openedAt.current,
        }),
        signal: controller.signal,
      });

      // Kahit error ang status, subukan pa ring basahin ang JSON para sa error code
      const result = await response.json().catch(() => null);

      if (result && result.ok) {
        setBookingId(result.id || '');
        setIsSubmitted(true);
        return;
      }

      const code = result && result.error;
      setSubmitError(ERROR_MESSAGES[code] || 'Something went wrong on our side. Please try again.');
      if (code === 'SLOT_FULL') {
        setFormData((prev) => ({ ...prev, time: '' }));
        setSlotsVersion((v) => v + 1);
      }
      if (ERROR_STEP[code]) setStep(ERROR_STEP[code]);
    } catch (err) {
      setSubmitError(
        err && err.message === 'not-configured'
          ? 'Online booking is not available right now.'
          : 'We could not send your booking. Please check your connection and try again.'
      );
    } finally {
      clearTimeout(timer);
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  // ---------- SUCCESS SCREEN ----------
  if (isSubmitted) {
    return (
      <div className="px-6 py-24 max-w-2xl mx-auto w-full bg-[#FDFBFB] min-h-screen flex items-center justify-center text-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
          <div className="w-16 h-16 bg-[#C5A059] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl" aria-hidden="true">✓</div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-4">Booking Request Received</h1>
          <p className="text-gray-500 mb-2">Thank you, {formData.name.trim()}. We've received your request for:</p>
          <p className="text-[#C5A059] font-semibold text-lg mb-6">{formData.service}</p>
          <p className="text-gray-500 text-sm mb-6">
            {formatDate(formData.date)} at {slotLabel(formData.time)}
            {formData.staff && (
              <>
                <br />
                with {formData.staff}
              </>
            )}
          </p>
          <p className="text-slate-700 text-sm">
            Your booking is <span className="font-semibold">not confirmed yet</span>. Our team will contact you at{' '}
            {formData.phone.trim()} to confirm.
          </p>
          {bookingId && <p className="text-gray-400 text-xs mt-6">Reference: {bookingId}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-24 max-w-3xl mx-auto w-full bg-[#FDFBFB] min-h-screen">
      <div className="text-center mb-12">
        <span className="uppercase tracking-[0.3em] text-gray-500 font-medium text-xs mb-4 block">Reserve Your Spot</span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-slate-900">
          Book Your <span className="italic text-[#C5A059]">Experience</span>
        </h1>
        <div className="h-px w-40 bg-[#C5A059] mx-auto opacity-50 mt-6"></div>
      </div>

      {/* LIVE ANNOUNCEMENT FOR SCREEN READERS - invisible, announces step changes */}
      <div aria-live="polite" className="sr-only">
        Step {step} of 4: {stepLabels[step - 1]}
      </div>

      {/* PROGRESS INDICATOR */}
      <div
        role="group"
        aria-label={`Step ${step} of 4: ${stepLabels[step - 1]}`}
        className="flex items-center justify-center gap-2 mb-12"
      >
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center">
            <div
              aria-hidden="true"
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                step >= num ? 'bg-[#C5A059] text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {num}
            </div>
            {num < 4 && (
              <div aria-hidden="true" className={`w-12 h-px ${step > num ? 'bg-[#C5A059]' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl relative">
        {/* PANG-BITAG SA BOT: nakatago sa tao, pinupunan ng bot */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="website-field">Website</label>
          <input
            id="website-field"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {submitError && (
          <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <p>{submitError}</p>
            {CONTACT_PHONE && <p className="mt-1">You can also call or text us at {CONTACT_PHONE}.</p>}
          </div>
        )}

        {/* STEP 1: SELECT SERVICE */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Select a Service</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="service-select" className={labelClass}>
                Service
              </label>
              <select
                id="service-select"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={fieldClass}
              >
                <option value="">-- Choose a service --</option>
                {services.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title} — {service.price}
                  </option>
                ))}
              </select>
            </div>
            <Button variant="primary" className="w-full py-4" onClick={goNext} disabled={!formData.service}>
              Next
            </Button>
          </div>
        )}

        {/* STEP 2: PERSONAL INFO */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Your Information</h2>
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Juan Dela Cruz"
            />
            <div>
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0912 345 6789"
              />
              {formData.phone && !phoneOk && (
                <p className="text-xs text-red-600 mt-1 ml-1">Please enter a valid phone number.</p>
              )}
            </div>
            <div>
              <Input
                label="Email (optional)"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="juan@email.com"
              />
              {!emailOk && <p className="text-xs text-red-600 mt-1 ml-1">That email address does not look right.</p>}
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" className="w-full py-4" onClick={goBack}>
                Back
              </Button>
              <Button
                variant="primary"
                className="w-full py-4"
                onClick={goNext}
                disabled={!nameOk || !phoneOk || !emailOk}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: DATE, TIME, STYLIST */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Preferred Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="date-input" className={labelClass}>
                  Preferred Date
                </label>
                <input
                  id="date-input"
                  name="date"
                  type="date"
                  min={now.date}
                  max={maxDate}
                  value={formData.date}
                  onChange={handleChange}
                  className={fieldClass}
                />
                {dateProblem && <p className="text-xs text-red-600 ml-1">{dateProblem}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="time-select" className={labelClass}>
                  Preferred Time
                </label>
                <select
                  id="time-select"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  disabled={!formData.date || Boolean(dateProblem)}
                  className={fieldClass}
                >
                  <option value="">-- Choose a time --</option>
                  {SLOTS.map((t) => {
                    const isPast = formData.date === now.date && t <= now.time;
                    const isFull = (slots.counts[t] || 0) >= slots.max;
                    return (
                      <option key={t} value={t} disabled={isPast || isFull}>
                        {slotLabel(t)}
                        {isFull ? ' (Full)' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div aria-live="polite" className="text-xs text-gray-500 ml-1">
              {slots.status === 'loading' && 'Checking available times...'}
              {slots.status === 'error' &&
                "We couldn't check availability right now. You can still pick a time and we'll confirm it with you."}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="staff-select" className={labelClass}>
                Preferred Stylist (optional)
              </label>
              <select
                id="staff-select"
                name="staff"
                value={formData.staff}
                onChange={handleChange}
                className={fieldClass}
              >
                <option value="">No preference</option>
                {staff.map((member) => (
                  <option key={member.id} value={member.name}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="notes-input" className={labelClass}>
                Notes (optional)
              </label>
              <textarea
                id="notes-input"
                name="notes"
                rows={3}
                maxLength={500}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Anything we should know?"
                className={fieldClass}
              />
            </div>

            <div className="flex gap-4">
              <Button variant="secondary" className="w-full py-4" onClick={goBack}>
                Back
              </Button>
              <Button
                variant="primary"
                className="w-full py-4"
                onClick={goNext}
                disabled={!formData.date || !formData.time || Boolean(dateProblem)}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & SEND */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Review Your Booking</h2>
            <div className="bg-[#FDFBFB] rounded-2xl p-6 space-y-3 text-slate-700">
              <p><span className="font-semibold">Service:</span> {formData.service} {selectedService && `(${selectedService.price})`}</p>
              <p><span className="font-semibold">Name:</span> {formData.name.trim()}</p>
              <p><span className="font-semibold">Phone:</span> {formData.phone.trim()}</p>
              {formData.email.trim() && <p><span className="font-semibold">Email:</span> {formData.email.trim()}</p>}
              <p><span className="font-semibold">Date:</span> {formatDate(formData.date)}</p>
              <p><span className="font-semibold">Time:</span> {slotLabel(formData.time)}</p>
              <p><span className="font-semibold">Stylist:</span> {formData.staff || 'No preference'}</p>
              {formData.notes.trim() && <p><span className="font-semibold">Notes:</span> {formData.notes.trim()}</p>}
            </div>
            <p className="text-xs text-gray-500">
              This sends a booking request. Your appointment is confirmed once our team contacts you.
            </p>
            <div className="flex gap-4">
              <Button variant="secondary" className="w-full py-4" onClick={goBack} disabled={submitting}>
                Back
              </Button>
              <Button variant="primary" className="w-full py-4" onClick={handleConfirm} disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Booking Request'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingPage;