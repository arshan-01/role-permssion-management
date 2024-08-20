import React from 'react';

function StatusBadge({ status, role }) {
  const getRandomColor = () => {
    const colors = [
      'bg-blue-400/5 text-blue-600',
      'bg-green-400/5 text-green-600',
      'bg-yellow-400/5 text-yellow-600',
      'bg-red-400/5 text-red-600',
      'bg-purple-400/5 text-purple-600',
      'bg-pink-400/5 text-pink-600',
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const getStyle = () => {
    // Define styles for status
    const statusStyles = {
      active: 'bg-green-600/5 text-green-600',
      inactive: 'bg-red-600/5 text-red-600',
      Pending: 'bg-yellow-600/5 text-yellow-600',
      Suspended: 'bg-gray-600/5 text-gray-600',
    };

    // Apply random color for roles if a role is provided
    if (role) {
      return getRandomColor();
    }

    // Fallback to status-based styles if no role is provided
    return status && statusStyles[status] ? statusStyles[status] : 'bg-gray-600/5 text-gray-600';
  };

  return (
    <span
      className={`text-[11px] font-medium px-2.5 py-0.5 rounded h-5 ${getStyle()}`}
    >
      {role || status}
    </span>
  );
}

export default StatusBadge;
