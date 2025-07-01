import React, { useState } from 'react';

interface TextBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const TextBox: React.FC<TextBoxProps> = ({ 
  placeholder = "Enter your discussion topic...",
  value: externalValue,
  onChange 
}) => {
  const [internalValue, setInternalValue] = useState('');
  const value = externalValue !== undefined ? externalValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <textarea
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default TextBox;
