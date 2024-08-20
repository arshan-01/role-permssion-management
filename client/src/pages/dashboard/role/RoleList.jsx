import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRole, getRoles } from '../../../redux/features/role/role.service';
import { useGlobalDeleteHandler } from '../../../utils/GlobalApiHandler';
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

    useEffect(() => {
        // Only perform the search if there's a search query
        if (searchQuery !== '') {
            const delayDebounceFn = setTimeout(() => {
                dispatch(getRoles({ 
                    search: searchQuery,
                    limit: itemsPerPage,  
                    filter,
                    currentPage,
                    sortColumn,
                    sortOrder
                }));
            }, 1000);
    
            // Cleanup function to cancel the timeout if the effect is called again before the delay
            return () => clearTimeout(delayDebounceFn);
        } else {
            // If searchQuery is empty, perform the search immediately
            dispatch(getRoles({ 
                search: searchQuery,
                limit: itemsPerPage,  
                filter,
                currentPage,
                sortColumn,
                sortOrder
            }));
        }
    }, [searchQuery, filter, currentPage, itemsPerPage, sortColumn, sortOrder]);
    
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
        { key: 'avatar', label: 'Avatar' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status' },
        { key: 'createdAt', label: 'Created At' },
      ];
      
      const data = [
        {
          _id: '1',
          avatar: 'https://via.placeholder.com/40', // Sample avatar URL
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'Admin',
          status: 'Suspended',
          createdAt: '2024-08-01',
        },
        {
          _id: '2',
          avatar: 'https://via.placeholder.com/40', // Sample avatar URL
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          role: 'User',
          status: 'Inactive',
          createdAt: '2024-08-02',
        },
        {
          _id: '3',
          avatar: 'https://via.placeholder.com/40', // Sample avatar URL
          name: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          role: 'Editor',
          status: 'Pending',
          createdAt: '2024-08-03',
        },
        {
          _id: '4',
          avatar: 'https://via.placeholder.com/40', // Sample avatar URL
          name: 'Bob Brown',
          email: 'bob.brown@example.com',
          role: 'User',
          status: 'Active',
          createdAt: '2024-08-04',
        },
        {
          _id: '5',
          avatar: 'https://via.placeholder.com/40', // Sample avatar URL
          name: 'Charlie Black',
          email: 'charlie.black@example.com',
          role: 'Admin',
          status: 'Inactive',
          createdAt: '2024-08-05',
        },
      ];
      
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Role List</h1>
            <DataTable
                columns={columns}
                data={data}
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
