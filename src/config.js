// src/config.js
// Mga setting ng website booking.
// Ang URL ng Apps Script ay PUBLIC sa disenyo (nasa browser ng bawat bisita).
// Huwag maglagay dito ng anumang password o secret key.

// Ang "Web app URL" ng Apps Script. Nagtatapos sa /exec
export const API_BASE_URL = 'https://crosscut-salon-backend.onrender.com';
export const API_KEY = import.meta.env.VITE_API_KEY || '';
// Ipapakita kapag pumalya ang pagpapadala ng booking. Iwanang '' kung wala pa.
// Halimbawa: '0917 123 4567'
export const CONTACT_PHONE = '09560641763';

// DAPAT magkapareho sa Script properties ng Apps Script
// (OPEN_TIME 08:00, CLOSE_TIME 18:00, MAX_DAYS_AHEAD 60)
export const OPEN_HOUR = 8; // unang slot: 8:00 AM
export const CLOSE_HOUR = 18; // huling slot: 5:00 PM (bago mag-6:00 PM)
export const MAX_DAYS_AHEAD = 60;
export const TIMEZONE = 'Asia/Manila';
