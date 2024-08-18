import React, { useState } from 'react';
import { FaEdit, FaTrash, FaDownload, FaChevronLeft, FaChevronRight, FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';
import { IoDownload } from "react-icons/io5";

const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  downloadData,
  itemsPerPage,
  onItemsPerPageChange,
  setSearchQuery,
  searchQuery,
  onFilter,
  onSort,
  currentPage,
  onPageChange,
  totalPages,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column.key]: '' }), {})
  );
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);

  const handleRowSelect = (itemId) => {
    setSelectedRows((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleColumnFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSortIconClick = (key) => {
    const newSortOrder = sortColumn === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(key);
    setSortOrder(newSortOrder);
    setActiveFilterColumn(key);
    console.log(`Column: ${key}, Order: ${newSortOrder}`);
    onSort(key, newSortOrder);
  };

  const handleFilterIconClick = (key) => {
    setActiveFilterColumn(activeFilterColumn === key ? null : key);
  };

  // Pagination calculations
  const pageNumbers = [];
  const maxPagesToShow = 5;
  // elipse for pagination
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
    <div className="w-full">
      {/* Search */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="border rounded-lg p-2"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b border-gray-200">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(data.map((row) => row.id));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="relative py-2 px-4 border-b border-gray-200 text-gray-700 font-semibold text-sm"
                >
                  <div className="flex items-center">
                    {column.label}
                    <button
                      onClick={() => handleSortIconClick(column.key)}
                      className="ml-2 text-gray-500"
                    >
                      {sortColumn === column.key && sortOrder === 'asc' ? (
                        <FaSortAmountUp />
                      ) : sortColumn === column.key && sortOrder === 'desc' ? (
                        <FaSortAmountDown />
                      ) : (
                        <FaSortAmountUp />
                      )}
                    </button>
                  </div>
                </th>
              ))}
              <th className="py-2 px-4 border-b border-gray-200 text-gray-700 font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                  />
                </td>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="py-2 px-4 border-b border-gray-200 text-gray-700 text-sm"
                  >
                    {row[column.key]}
                  </td>
                ))}
                <td className="py-2 px-4 border-b border-gray-200 text-gray-700 text-sm flex">
                  <button onClick={() => onEdit(row)} className="mr-2 text-blue-500">
                    <FaEdit />
                  </button>
                  <button onClick={() => onDelete(row.id)} className="text-red-500">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <label className="mr-2">Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border rounded-lg p-2"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 bg-gray-300 p-2 rounded-lg flex items-center"
          >
            <FaChevronLeft />
          </button>
          {pageNumbers.map((pageNumber, index) =>
            pageNumber === '...' ? (
              <span key={index} className="mr-2">...</span>
            ) : (
              <button
                key={index}
                onClick={() => onPageChange(pageNumber)}
                className={`mr-2 p-2 rounded-lg ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 p-2 rounded-lg flex items-center"
          >
            <FaChevronRight />
          </button>
        </div>
        <div>
          <button onClick={downloadData} className="bg-green-500 text-white p-2 rounded-lg">
            <IoDownload className="inline mr-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
