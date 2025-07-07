import React from 'react';

interface AddButtonProps {
  onClick?: () => void;
  text?: string;
}

const AddButton: React.FC<AddButtonProps> = ({ 
  onClick, 
  text = "Add " 
}) => {
  return (
    <button
      className="!bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:!bg-blue-700 transition-colors duration-150 ease-in-out flex items-center justify-center mx-auto"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default AddButton;
