import React from 'react';

export const Button = ({ type, title, className, onClick, children }) => {
  return (
    <button type={type} title={title} className={className} onClick={onClick}>
      {children}
    </button>
  );
};  