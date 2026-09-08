function Input({ label, type = "text", placeholder, value, onChange, name }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-semibold text-gray-500 ml-1">{label}</label>}
      <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-white border border-gray-200 p-3 rounded-xl text-slate-800 focus:border-[#C5A059] outline-none transition-all placeholder:text-gray-400" 
      />
    </div>
  );
}

export default Input;