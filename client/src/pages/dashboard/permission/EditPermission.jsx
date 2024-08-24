import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getPermissions, updatePermission } from '../../../redux/features/permission/permission.service';
import { updatePermissionOnLocal } from '../../../redux/features/permission/permission.slice';

// Options for the select dropdown
const actionOptions = [
    { value: 'read', label: 'Read' },
    { value: 'create', label: 'Create' },
    { value: 'update', label: 'Update' },
    { value: 'delete', label: 'Delete' },
];

const EditPermission = () => {
    const dispatch = useDispatch();
    const currentPermission = useSelector(state => state?.permission?.currentPermission) || {};
    const [moduleTitle, setModuleTitle] = useState('');
    const [selectedActions, setSelectedActions] = useState([]);

    // Sample selected permissions
    const selectedPermissions = currentPermission.actions || [];

    // Function to convert permissions to options
    const convertPermissionsToOptions = (permissions) => {
        return permissions.map(permission => {
            const [, action] = permission.split('-');
            return { value: action, label: action };
        });
    };

    useEffect(() => {
        if (selectedPermissions.length > 0) {
            // Extract module name from the first permission
            const firstPermission = selectedPermissions[0];
            const module = firstPermission.split('-')[0];
            setModuleTitle(module);

            // Convert permissions to select options
            const options = convertPermissionsToOptions(selectedPermissions);
            setSelectedActions(options);
        }
    }, [selectedPermissions]);

    const handleModuleTitleChange = (e) => {
        setModuleTitle(e.target.value);
        dispatch(updatePermissionOnLocal({ id: currentPermission._id, module: e.target.value }));
    };

    const handleActionChange = (selectedOptions) => {
        setSelectedActions(selectedOptions || []);
    };

    const handleAddPermission = () => {
        if (!moduleTitle || selectedActions.length === 0) {
            console.error('Module title and actions are required');
            return;
        }

        // Create formatted permissions list
        const formattedPermissions = selectedActions.map(action =>
            `${moduleTitle.toLowerCase()}-${action.value}`
        );

        dispatch(updatePermission({ 
            id: currentPermission._id,
            permissionData: { module: moduleTitle, actions: formattedPermissions }
        }))
        .unwrap()
        .then(() => {
            dispatch(getPermissions({ page: 1, limit: 10, sort: 'asc', search: '', isDeleted: false }));
        })
        .catch(error => console.error('Failed to update permission:', error));

        // Reset state after adding the permissions
        setModuleTitle('');
        setSelectedActions([]);
    };

    // Custom NoOptionsMessage component to display a custom message
    const NoOptionsMessage = (props) => (
        <components.NoOptionsMessage {...props}>
            Write to create
        </components.NoOptionsMessage>
    );

    return (
        <div className="max-w-3xl mx-auto p-6 h-94 w-150">
            <h1 className="text-2xl font-semibold mb-6 text-primary">Edit Permissions</h1>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Module Title</label>
                <input
                    type="text"
                    value={moduleTitle}
                    onChange={handleModuleTitleChange}
                    placeholder="Enter module title"
                    className="border border-gray-300 rounded-md p-2 w-full"
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Select Actions</label>
                <CreatableSelect
                    isMulti
                    options={actionOptions}
                    value={selectedActions}
                    onChange={handleActionChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select or create actions..."
                    components={{ NoOptionsMessage }}
                />
            </div>

            <button
                onClick={handleAddPermission}
                className="bg-primary mt-8 text-white px-6 py-3 rounded-md hover:bg-blue-700 float-right"
            >
                Update Permission
            </button>
        </div>
    );
};

export default EditPermission;
