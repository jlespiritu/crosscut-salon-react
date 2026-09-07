function Badge({ children, variant = 'default', className = '' }) {
  const styles = {
    default: 'bg-gray-100 text-gray-600 border-gray-200',
    premium: 'bg-brand-gold/10 text-brand-gold border-brand-gold/30',
    highlight: 'bg-brand-blush text-brand-rose border-brand-rose/30',
  };

  return (
    <span className={`px-2 py-1 rounded-md text-[10px] uppercase tracking-widest font-bold border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;