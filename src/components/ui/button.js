import React from 'react';

export const Button = ({ children, onClick, variant = 'default' }) => {
  const base =
    'rounded-lg px-4 py-2 font-semibold shadow text-white transition duration-200';
  const variants = {
    default: 'bg-blue-600 hover:bg-blue-700',
    outline: 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-100',
    destructive: 'bg-red-500 hover:bg-red-600',
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
};
