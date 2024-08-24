import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRole, getRoles } from '../../../redux/features/role/role.service';
import useDebouncedEffect, { useGlobalDeleteHandler } from '../../../utils/GlobalApiHandler';
import components from '../../../components/Modal/Index';
import { openModal } from '../../../redux/features/modal/modal.slice';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Breadcrumb from '../../../components/BreadCrumb/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { setCurrentRoleId } from '../../../redux/features/role/role.slice';
import DataTable from '../../../components/DataTable/DataTable';

const Roles = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { DataTable } = components;
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
                sortOrder,
                isDeleted: false
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
    // Handle the create role button click
    const HaandleCreateRole = () => {
        // navigate to create role page
        navigate("/dashboard/role/create");
    };
    return (
        <DashboardLayout>
            <Breadcrumb
                items={[{ href: '/dashboard', label: 'Dashboard' }, { label: 'Roles' }]}
            />
            <div className="flex items-center float-right">
                {/* <Link to="/dashboard/role/create" className="px-3 py-2 lg:px-4 bg-primary text-white text-sm font-semibold rounded hover:bg-blue-600">
                    Create New
                </Link> */}
                <button onClick={HaandleCreateRole} className="px-3 py-2 lg:px-4 bg-primary text-white text-sm font-semibold rounded hover:bg-blue-600">
                    Create New
                </button>
            </div>
            <div className="container mx-auto p-4">
                <DataTable
                    tableTitle="Roles Details"
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
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                />
            </div>
        </DashboardLayout>
    );
};

export default Roles;
