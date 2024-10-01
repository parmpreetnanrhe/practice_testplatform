import React from 'react';

const Input = ({ type, id, name , checked, placeholder, value, onChange }) => {
    return (
        <input 
            type={type} 
            id = {id}
            name = {name}
            checked = {checked}
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} 
        />
    );
};

export default Input;
