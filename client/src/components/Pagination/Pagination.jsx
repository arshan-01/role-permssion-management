import React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'; // Import icons from react-icons

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, handleItemsPerPageChange, data }) => {
  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Generate page numbers
  const pageNumbers = [];
  const maxPagesToShow = 5;
  const elipse = '...';

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = currentPage - halfPagesToShow;
    let endPage = currentPage + halfPagesToShow;

    if (startPage <= 0) {
      startPage = 1;
      endPage = maxPagesToShow;
    }
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - maxPagesToShow + 1;
    }
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push(elipse);
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(elipse);
      }
      pageNumbers.push(totalPages);
    }
  }

  return (
    <div className="dataTable-bottom flex items-center justify-between border-gray-200 bg-white px-2 py-3">
<div className='flex justify-around items-center'>
  <div className="items-per-page mr-9 flex items-center">
    <label htmlFor="items-per-page" className="text-sm text-gray-7">Items per page</label>
    <select
    id="items-per-page"
    value={itemsPerPage}
    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))} // Convert value to number
    className=" mx-3 block w-15 py-2 px-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-7 bg-white dark:bg-gray-800 dark:text-gray-2 dark:border-gray-600 sm:text-sm"
  >
    {[10, 20, 30, 50].map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
  </div>
  <div className="dataTable-info text-sm text-gray-5">
  Showing{' '}
  <span className="font-medium">
    {(currentPage - 1) * itemsPerPage + 1}
  </span>{' '}
  to{' '}
  <span className="font-medium">
    {Math.min(currentPage * itemsPerPage, data.length)}
  </span>{' '}
  of <span className="font-medium">{data.length}</span> entries
</div>

</div>

      <nav className="dataTable-pagination">
        <ul className="dataTable-pagination-list flex items-center space-x-2">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-8 h-8 text-gray-5 hover:bg-light-gray rounded-md disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
          </li>
          {pageNumbers.map((page, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 flex items-center justify-center text-sm font-medium ${page === currentPage ? 'text-white bg-primary' : 'text-gray-9 ring-1 ring-inset ring-gray-300 hover:bg-light-gray'} rounded-md`}
              >
                {page === elipse ? '...' : page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-8 h-8 text-gray-5 hover:bg-light-gray-100 rounded-md disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
