import React from 'react';

export const Button = ({ type, title, className, text, onClick }) => {
  return (
    <button type={type} title={title} className={className} onClick={onClick}>
      {text}
    </button>
  );
};  