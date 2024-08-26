import React, { useState } from 'react';
import Creatable from 'react-select/creatable';
import { components } from 'react-select';
import { useDispatch } from 'react-redux';
import { createPermission, getPermissions } from '../../../redux/features/permission/permission.service';

// Options for the select dropdown
const actionOptions = [
  { value: 'read', label: 'Read' },
  { value: 'create', label: 'Create' },
  { value: 'update', label: 'Update' },
  { value: 'delete', label: 'Delete' },
];

const CreatePermission = () => {
  const dispatch = useDispatch();
  const [moduleTitle, setModuleTitle] = useState('');
  const [selectedActions, setSelectedActions] = useState([]);

  const handleModuleTitleChange = (e) => {
    setModuleTitle(e.target.value);
  };

  const handleActionChange = (selectedOptions) => {
    setSelectedActions(selectedOptions || []);
  };

  const handleCreatePermission = () => {
    // if (!moduleTitle || selectedActions.length === 0) {
    //   console.error('Module title and actions are required');
    //   return;
    // }

    // Create formatted permissions list
    const formattedPermissions = selectedActions.map(action =>
      `${moduleTitle.toLowerCase()}-${action.value}`
    );
    dispatch(createPermission({ module: moduleTitle, actions: formattedPermissions }))
    .unwrap()
    .then(() => {
      dispatch(getPermissions(
        { page: 1, limit: 10, sort: 'asc', search: '' , isDeleted : false }
      ));
    })
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
      <h1 className="text-2xl font-semibold mb-6 text-primary">Create Permissions</h1>

      <div className="mb-6">
        <label className="block text-gray-7 text-sm font-medium mb-2">Module Title</label>
        <input
          type="text"
          value={moduleTitle}
          onChange={handleModuleTitleChange}
          placeholder="Enter module title"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-7 text-sm font-medium mb-2">Select Actions</label>
        <Creatable
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
        onClick={handleCreatePermission}
        className="bg-primary mt-8 text-white px-6 py-3 rounded-md hover:bg-blue-700 float-right"
      >
        Create Permission
      </button>
    </div>
  );
};

export default CreatePermission;
