import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaSortAmountUp, FaSortAmountDown, FaSort, FaRegEdit } from 'react-icons/fa';
import { IoDownload } from "react-icons/io5";
import StatusBadge from './StatusBadge';
import { FaRegTrashCan, FaSortDown, FaSortUp } from "react-icons/fa6";
import Pagination from './Pagination';
import { formatDate } from '../utils/formatDate';
const DataTable = ({
  tableTitle,
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
  sortColumn,
  sortOrder,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);
  const [filters, setFilters] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column.key]: '' }), {})
  );
  const selectAllRef = useRef(null);

  const handleSortIconClick = (key) => {
    const newSortOrder = sortColumn === key && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(key, newSortOrder);
  };

  const handleRowSelect = (itemId) => {
    setSelectedRows((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((_id) => _id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row._id));
    }
  };

  useEffect(() => {
    if (selectAllRef.current) {
      const allSelected = data.length > 0 && selectedRows.length === data.length;
      const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;
      selectAllRef.current.checked = allSelected;
      selectAllRef.current.indeterminate = someSelected;
    }
  }, [selectedRows, data]);

  const handleColumnFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleFilterIconClick = (key) => {
    setActiveFilterColumn(activeFilterColumn === key ? null : key);
  };

  return (
    <div className="w-full">
      {/* Table Title */}
      <h6 className="text-md font-semibold mb-4">{tableTitle}</h6>
      {/* Hr line */}
      <hr className="border-dotted border-gray-200 mb-4" />
      {/* Search */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-lg px-3 w-1/4"
        />

        <div>
          <button onClick={downloadData} className="p-2 mx-3 rounded-lg bg-gray-100 text-green-500 hover:bg-gray-200">
            <IoDownload className="inline" size={20} />
          </button>
          <button onClick={downloadData} className="p-2 rounded-lg bg-gray-100 text-red-500 hover:bg-gray-200">
            <FaTrash className="inline" size={20} />
          </button>
        </div>
      </div>
      {
        // Check if the data is empty
        data.length === 0 ? (
          <>
            <hr className="border-dotted border-gray-200 mb-4" />
            <p className="text-center">No data found</p>
          </>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-50 rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-50 text-left uppercase">
                    <th className="py-2 px-4 border-b border-gray-200">
                      <input
                        ref={selectAllRef}
                        type="checkbox"
                        onChange={handleSelectAll}
                      />
                    </th>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="relative py-2 px-4 border-b border-gray-200 text-gray-700 font-semibold text-xs cursor-pointer"
                        onClick={() => handleSortIconClick(column.key)}
                      >
                        <div className="flex items-center">
                          {column.label}
                          {sortColumn === column.key ? (
                            <span className="ml-2 flex flex-col items-center justify-center">
                              <FaSortUp className={`${sortOrder === 'asc' ? 'text-black' : 'text-gray-400'} -mb-1`} />
                              <FaSortDown className={`${sortOrder === 'desc' ? 'text-black' : 'text-gray-400'} -mt-1`} />
                            </span>
                          ) : (
                            <span className="ml-2">
                              <FaSort className="text-gray-400" />
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                    <th className="py-2 px-4 border-b border-gray-200 text-gray-700 font-semibold text-xs">
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
                          checked={selectedRows.includes(row._id)}
                          onChange={() => handleRowSelect(row._id)}
                        />
                      </td>
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className="py-2 px-4 border-b-2 border-dotted border-gray-200 text-gray-700 text-sm"
                        >
                          {column.key === 'avatar' ? (
                            <div className="flex items-center">
                              <img src={row[column.key]} alt="avatar" className="mr-2 h-8 rounded-full inline-block" />
                              {row.name}
                            </div>
                          ) : column.key === 'status' ? (
                            <StatusBadge status={row.status} />
                          ) : column.key === 'role' ? (
                            <StatusBadge role={row.role} />
                          ) : column.key === 'createdAt' ? (
                            formatDate(row[column.key])
                          ) : (
                            row[column.key]
                          )}
                        </td>
                      ))}
                      <td className="py-2 px-4 border-b-2 border-dotted border-gray-200 text-gray-700 text-sm">
                        <button onClick={() => onEdit(row)} className="mr-2 text-blue-500">
                          <FaRegEdit />
                        </button>
                        <button onClick={() => onDelete(row._id)} className="text-red-500">
                          <FaRegTrashCan />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              itemsPerPage={itemsPerPage}
              handleItemsPerPageChange={onItemsPerPageChange}
              data={data}
            />
          </>
        )
      }
    </div>
  );
};

export default DataTable;
