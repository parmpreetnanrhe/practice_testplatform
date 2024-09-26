import React from 'react';

export const Button = ({ type, title, className, text, onClick }) => {
  return (
    <button type={type} title={title} onClick={onClick} className={className}>
      {text}
    </button>
  );
};