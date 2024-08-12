import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';

// Options for the select dropdown
const actionOptions = [
    { value: 'view', label: 'View' },
    { value: 'create', label: 'Create' },
    { value: 'update', label: 'Update' },
    { value: 'delete', label: 'Delete' },
];

const EditPermissions = () => {
    const [moduleTitle, setModuleTitle] = useState('');
    const [selectedActions, setSelectedActions] = useState([]);

    // Sample selected permissions
    const selectedPermissions = [
        'product-view',
        'product-create',
        'product-update',
        'product-updatesss',
    ];

    // Function to convert permissions to options
    const convertPermissionsToOptions = (permissions) => {
        return permissions.map(permission => {
            const [module, action] = permission.split('-');
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
    }, []);

    const handleModuleTitleChange = (e) => {
        setModuleTitle(e.target.value);
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
            `${moduleTitle}-${action.value}`
        );

        console.log('Formatted Permissions:', formattedPermissions);
    };
    // Custom NoOptionsMessage component to display a custom message
    const NoOptionsMessage = (props) => (
        <components.NoOptionsMessage {...props}>
            Write to create
        </components.NoOptionsMessage>
    );
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-6 text-primary">Edit Permissions</h1>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Module Title</label>
                <input
                    type="text"
                    value={moduleTitle.charAt(0).toUpperCase() + moduleTitle.slice(1)}
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
                className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
                Update Permission
            </button>
        </div>
    );
};

export default EditPermissions;
