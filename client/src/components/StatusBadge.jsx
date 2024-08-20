import React from 'react';

function StatusBadge({ status, role }) {
  const getStyle = () => {
    // Define styles for status
    const statusStyles = {
      Active: 'bg-green-600/5 text-green-600',
      Inactive: 'bg-red-600/5 text-red-600',
      Pending: 'bg-yellow-600/5 text-yellow-600',
      Suspended: 'bg-gray-600/5 text-gray-600',
    };

    // Define styles for role
    const roleStyles = {
      Admin: 'bg-blue-600/5 text-blue-600',
      User: 'bg-green-600/5 text-green-600',
      Editor: 'bg-yellow-600/5 text-yellow-600',
    };

    // Apply role-based styles if a role is provided and valid
    if (role && roleStyles[role]) {
      return roleStyles[role];
    }

    // Fallback to status-based styles if role-based style is not applied
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
