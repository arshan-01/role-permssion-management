import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditModal from '../components/Modal';

const permissionsArray = [
    { id: 1, module: 'product', actions: ['product-create', 'product-delete', 'product-update'] },
    { id: 2, module: 'user', actions: ['user-update', 'user-create'] },
    { id: 3, module: 'order', actions: ['order-view', 'order-update'] },
    { id: 4, module: 'role', actions: ['role-create', 'role-update'] },
];

const ListPermissions = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);

    const groupPermissionsByModule = () => {
        return permissionsArray.reduce((acc, { id, module, actions }) => {
            acc[module] = { id, actions };
            return acc;
        }, {});
    };

    const groupedPermissions = groupPermissionsByModule();

    const handleEdit = (moduleData) => {
        setSelectedModule(moduleData);
        setIsModalOpen(true);
    };

    const handleSave = (updatedModule) => {
        // Update the permissions array with the new data
        console.log('Updated Module Data:', updatedModule);
        // Optionally, call an API to update the permissions
        // fetch(`/api/permissions/${updatedModule.id}`, { method: 'PUT', body: JSON.stringify(updatedModule) });
    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete the permissions for this module?`)) {
            console.log(`Deleting permissions for module with ID: ${id}`);
            // Optionally, call an API to delete the permissions
            // fetch(`/api/permissions/${id}`, { method: 'DELETE' });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-6 text-primary">Permissions List</h1>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Module Name</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(groupedPermissions).map(([module, { id, actions }]) => (
                        <tr key={id}>
                            <td className="py-2 px-4 border-b font-medium">{module}</td>
                            <td className="py-2 px-4 border-b">
                                {actions.map((action) => (
                                    <span
                                        key={action}
                                        className="inline-block bg-blue-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                                    >
                                        {action.split('-')[1]}
                                    </span>
                                ))}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleEdit({ id, module, actions })}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Render the modal */}
            <EditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                moduleData={selectedModule}
                onSave={handleSave}
            />
        </div>
    );
};

export default ListPermissions;
