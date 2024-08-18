import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DataTable from '../../../components/DataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles } from '../../../redux/features/role/role.service';

const RoleList = () => {
    const dispatch = useDispatch();
    const roles = useSelector(state => state?.role?.roles?.roles) || [];
    const totalPages = useSelector(state => state?.role?.roles?.pages) || 0;
    console.log("🚀 ~ RoleList ~ roles:", roles)
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        // Only perform the search if there's a search query
        if (searchQuery !== '') {
            const delayDebounceFn = setTimeout(() => {
                dispatch(getRoles({ 
                    search: searchQuery,
                    limit: itemsPerPage,  
                    filter,
                    currentPage
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
                currentPage
            }));
        }
    }, [searchQuery, filter, currentPage, itemsPerPage]);
    

        const handleEdit = (role) => {
            // Handle the edit logic (e.g., open a modal for editing)
            console.log('Edit:', role);
        };

        const handleDelete = async (id) => {
            await api.delete(`/roles/${id}`);
            // Reload data after deletion
            getRoles({ currentPage, itemsPerPage });
        };

        const handleItemsPerPageChange = (value) => {
            setItemsPerPage(value);
            setCurrentPage(1); // Reset to the first page
        };

        const handleSearch = (searchQuery) => {
            setCurrentPage(1); // Reset to the first page
        };

        const handleFilter = (filter) => {
            setCurrentPage(1); // Reset to the first page
        };

        const columns = [
            { key: 'name', label: 'Role Name' },
        ];

        return (
            <div className="container mx-auto p-4">
                <h1 className="text-xl font-bold mb-4">Role List</h1>
                <DataTable
                    columns={columns}
                    data={roles}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    setSearchQuery={setSearchQuery}
                    searchQuery={searchQuery}
                    onFilter={handleFilter}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    totalPages = {totalPages}
                />
            </div>
        );
    };

    export default RoleList;
