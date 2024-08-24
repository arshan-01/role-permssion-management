import React from 'react';

function StatusBadge({ status, role, action }) {
  const getRandomColor = () => {
    const colors = [
      'bg-blue-400/5 text-blue-600 text-sm',
      'bg-green-400/5 text-green-600 text-sm',
      'bg-yellow-400/5 text-yellow-600 text-sm',
      'bg-red-400/5 text-red-600 text-sm',
      'bg-purple-400/5 text-purple-600 text-sm',
      'bg-pink-400/5 text-pink-600 text-sm',
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const getStyle = () => {
    // Define styles for status
    const statusStyles = {
      active: 'bg-green-600/5 text-green-600 text-sm',
      inactive: 'bg-red-600/5 text-red-600 text-sm',
      pending: 'bg-yellow-600/5 text-yellow-600 text-sm',
      suspended: 'bg-gray-600/5 text-gray-600 text-sm',
    };
  // Define styles for action
    const actionStyles = {
      read: 'bg-blue-600/5 text-blue-600 text-sm',
      create: 'bg-green-600/5 text-green-600 text-sm',
      update: 'bg-yellow-600/5 text-yellow-600 text-sm',
      delete: 'bg-red-600/5 text-red-600 text-sm',
      restore : 'bg-green-600/5 text-green-600 text-sm',
    };
    // Apply random color for roles if a role is provided
    if (role) {
      return getRandomColor();
    }
    if (action) {
      return action && 'bg-blue-600/5 text-blue-600 text-sm';
    }

    // Fallback to status-based styles if no role is provided
    return status && statusStyles[status] ? statusStyles[status] : 'bg-gray-600/5 text-gray-600';
  };

  return (
    <span
      className={`text-[11px] font-medium px-2.5 py-0.5 rounded h-5 ${getStyle()}`}
    >
      {role || status || action}
    </span>
  );
}

export default StatusBadge;
