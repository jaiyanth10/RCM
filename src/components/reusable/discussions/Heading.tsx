import React from 'react';

interface HeadingProps {
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h2 className="text-2xl font-bold mb-4">{text}</h2>
  );
};

export default Heading;
