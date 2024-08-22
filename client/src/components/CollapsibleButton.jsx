import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaUsers } from 'react-icons/fa';

function CollapsibleButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button 
      className={`flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-200 rounded ${isOpen ? 'bg-gray-100' : ''}`}
      onClick={handleToggle}
      aria-expanded={isOpen}
      aria-controls="collapsible-content"
    >
      <FaUsers className="text-xl" />
      <span className="font-medium">Teams</span>
      {isOpen ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />}
    </button>
  );
}

export default CollapsibleButton;
