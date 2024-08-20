// src/utils/formatDate.js
// Convert to date from 2024-08-19T20:04:09.755+00:00 to 2024-08-19 08:04 PM
// This function takes a timestamp as input and returns a formatted date and time string.
export function formatDate(timestamp) {
    const date = new Date(timestamp);
  
    // Extract date and time components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = String(hours % 12 || 12).padStart(2, '0'); // Convert to 12-hour format
  
    // Format the date and time
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
  
    return `${formattedDate} ${formattedTime}`;
  }
  
  