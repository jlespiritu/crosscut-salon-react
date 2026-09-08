function Button({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }) {
  const styles = {
    primary: 'bg-[#C5A059] text-white hover:bg-[#B38F4D] shadow-lg shadow-[#C5A059]/30', 
    secondary: 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50',
    outline: 'bg-transparent text-[#C5A059] border border-[#C5A059] hover:bg-[#C5A059] hover:text-white',
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-3 rounded-full font-medium transition-all duration-500 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;