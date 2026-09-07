function Input({ label, type = "text", placeholder, value, onChange, name }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-semibold text-gray-400 ml-1">{label}</label>}
      <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-black border border-white/10 p-3 rounded-xl text-white focus:border-pink-500 outline-none transition-all placeholder:text-gray-600" 
      />
    </div>
  );
}

export default Input;
