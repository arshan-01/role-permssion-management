import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getPermissions, parmanentDeletePermission } from '../../../redux/features/permission/permission.service';
import useDebouncedEffect, { useGlobalDeleteHandler } from '../../../utils/GlobalApiHandler';
import { openModal } from '../../../redux/features/modal/modal.slice';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Breadcrumb from '../../../components/BreadCrumb/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { setCurrentPermissionId } from '../../../redux/features/permission/permission.slice';
import DataTable from '../../../components/DataTable/DataTable';

const PermissionTrash = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const permissions = useSelector(state => state?.permission?.permissions?.permissions) || [];
    const totalPages = useSelector(state => state?.permission?.permissions?.pages) || 0;

    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('');
    const groupPermissionsByModule = () => {
        return permissions.reduce((acc, { _id, module, actions }) => {
            acc[module] = { _id, actions };
            return acc;
        }, {});
    };

    const groupedPermissions = groupPermissionsByModule();
    console.log("🚀 ~ Permissions ~ groupedPermissions:", groupedPermissions)

    // Handle the API call to get the permissions list with the updated query parameters
    useDebouncedEffect(
        () => {
            dispatch(getPermissions({
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
    const handleEdit = async (permission) => {
        dispatch(setCurrentRoleId(permission?._id))

        // navigate to edit permission page
        navigate(`/dashboard/permission/update`);
    };

    const { handleDeleteClick } = useGlobalDeleteHandler({
        thunkFunction: parmanentDeletePermission,
        fetchFunction: getPermissions,
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
        { key: 'module', label: 'Module' },
        { key: 'actions', label: 'Actions' },
        { key: 'status', label: 'Status' },
        { key: 'createdAt', label: 'Created At' },
    ];
    // Handle the create permission button click
    const HaandleCreateRole = () => {
       dispatch(openModal({
            componentName: 'CreatePermission',
            componentProps: {
                // Additional props you might want to pass
            },
        }));
    };
    return (
        <DashboardLayout>
            <Breadcrumb
                items={[{ href: '/dashboard', label: 'Dashboard' }, {href : '/dashboard/permissions', label: 'Permissions' }, {label: 'Trash' }]}
            />
            <div className="flex items-center float-right">
                {/* <Link to="/dashboard/permission/create" className="px-3 py-2 lg:px-4 bg-primary text-white text-sm font-semibold rounded hover:bg-blue-600">
                    Create New
                </Link> */}
                <button onClick={HaandleCreateRole} className="px-3 py-2 lg:px-4 bg-primary text-white text-sm font-semibold rounded hover:bg-blue-600">
                    Create New
                </button>
            </div>
            <div className="container mx-auto p-4">
                <DataTable
                    tableTitle="Deleted Permissions Details"
                    deleted = {true}
                    columns={columns}
                    data={permissions}
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

export default PermissionTrash