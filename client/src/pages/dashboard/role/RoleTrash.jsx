import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getRoles, parmanentDeleteRole } from '../../../redux/features/role/role.service';
import useDebouncedEffect, { useGlobalDeleteHandler } from '../../../utils/GlobalApiHandler';
import { openModal } from '../../../redux/features/modal/modal.slice';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Breadcrumb from '../../../components/BreadCrumb/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { setCurrentRoleId } from '../../../redux/features/role/role.slice';
import DataTable from '../../../components/DataTable/DataTable';

const RoleTrash = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deletedRoles = useSelector(state => state?.role?.roles?.roles) || [];
    // const deletedRoles = roles.filter(role => role?.isDeleted === true);
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
                sortOrder,
                isDeleted: true
            }));
        },
        [searchQuery, filter, currentPage, itemsPerPage, sortColumn, sortOrder],
        1000 // Delay in milliseconds
    );
    const handleEdit = async (role) => {
        dispatch(setCurrentRoleId(role?._id))

        // navigate to edit role page
        navigate(`/dashboard/role/update`);
    };

    const { handleDeleteClick } = useGlobalDeleteHandler({
        thunkFunction: parmanentDeleteRole,
        fetchFunction: getRoles,
        fetchParams: { search: searchQuery, limit: itemsPerPage, filter, currentPage, sortColumn, sortOrder, isDeleted: true },
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
        <DashboardLayout>
            <Breadcrumb
                items={[{ href: '/dashboard', label: 'Dashboard' }, {href : '/dashboard/roles', label: 'Roles' }, {label: 'Trash' }]}
            />
            <div className="container mx-auto p-4">
                <DataTable
                    tableTitle="Deleted Roles Details"
                    deleted = {true}
                    columns={columns}
                    data={deletedRoles}
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
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                />
            </div>
        </DashboardLayout>
    );
};

export default RoleTrash;
