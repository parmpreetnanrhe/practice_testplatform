import React from 'react';

export const Headings = ({ type, title, className, text }) => {
  // Use `React.createElement` to dynamically create the heading element
  return React.createElement(`h${type}`, { className, title }, text);
}
