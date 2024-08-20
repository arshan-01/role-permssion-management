import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRole, getRoles } from '../../../redux/features/role/role.service';
import useDebouncedEffect, { useGlobalDeleteHandler } from '../../../utils/GlobalApiHandler';
import components from '../../../components/Index';
import { openModal } from '../../../redux/features/modal/modal.slice';

const RoleList = () => {
    const dispatch = useDispatch();
    const {DataTable} = components;
    const roles = useSelector(state => state?.role?.roles?.roles) || [];
    const totalPages = useSelector(state => state?.role?.roles?.pages) || 0;

    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('');

// Handle the API call to get the roles list with the updated query parameters
    useDebouncedEffect(
        () => {
          dispatch(getRoles({ 
            search: searchQuery,
            limit: itemsPerPage,  
            filter,
            currentPage,
            sortColumn,
            sortOrder
          }));
        },
        [searchQuery, filter, currentPage, itemsPerPage, sortColumn, sortOrder],
        1000 // Delay in milliseconds
      );
    const handleEdit = (role) => {
        console.log('Edit:', role);
    };

    const { handleDeleteClick } = useGlobalDeleteHandler({
        thunkFunction: deleteRole,
        fetchFunction: getRoles,
        fetchParams: { search: searchQuery, limit: itemsPerPage, filter, currentPage, sortColumn, sortOrder },
        dispatch,
        openModal: (modalConfig) => dispatch(openModal(modalConfig)),
        componentName: 'DeleteConfirmation',
        componentProps: {
          // Additional props you might want to pass
        },
      });

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1); // Reset to the first page
    };

    const handleSort = (columnKey, order) => {
        setSortColumn(columnKey);
        setSortOrder(order);
    };

    const handleFilter = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1); // Reset to the first page
    };
    const columns = [
        { key: 'name', label: 'Role' },
        { key: 'status', label: 'Status' },
        { key: 'createdAt', label: 'Created At' },
      ];
      
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Role List</h1>
            <DataTable
                columns={columns}
                data={roles}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                onFilter={handleFilter}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onSort={handleSort}
                totalPages={totalPages}
                sortColumn = {sortColumn}
                sortOrder = {sortOrder}
            />
        </div>
    );
};

export default RoleList;
