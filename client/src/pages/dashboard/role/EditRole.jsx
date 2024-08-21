import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getActionsList } from '../../../redux/features/permission/permission.service';
import { updateRole } from '../../../redux/features/role/role.service';

const EditRole = () => {
  const dispatch = useDispatch();
  const currentRole = useSelector(state => state?.role?.currentRole) || [];
  console.log("🚀 ~ EditRole ~ currentRole:", currentRole)
  const permissions = useSelector(state => state?.permission?.actionList) || [];
  const [roleTitle, setRoleTitle] = useState(currentRole?.name);
  const [checkedPermissions, setCheckedPermissions] = useState({});
  const [globalChecks, setGlobalChecks] = useState({});

  // Extract categories and actions from the permissions array
  const extractCategoriesAndActions = (permissions) => {
    const categories = {};

    permissions.forEach(permission => {
      const [category, action] = permission.split('-');
      if (!categories[category]) {
        categories[category] = [];
      }
      if (!categories[category].includes(action)) {
        categories[category].push(action);
      }
    });

    return categories;
  };
  const categoriesAndActions = extractCategoriesAndActions(permissions);
  const actions = [...new Set(Object.values(categoriesAndActions).flat())];
  const predefinedActions = ['read', 'create', 'update', 'delete']; // Define predefined actions

  // Initialize globalChecks based on actions
  useEffect(() => {
    setGlobalChecks(actions.reduce((acc, action) => {
      acc[action] = false;
      return acc;
    }, {}));
  }, []);
  useEffect(() => {
    // Initialize checkedPermissions based on currentRole?.permissions?.
    const initialCheckedPermissions = {};
    currentRole?.permissions?.forEach(permission => {
        const [category, action] = permission.split('-');
        if (categoriesAndActions[category]?.includes(action)) {
            initialCheckedPermissions[`${category}-${action}`] = true;
        }
    });

    setCheckedPermissions(initialCheckedPermissions);
    updateGlobalChecks(initialCheckedPermissions);
}, []);
  const handleRoleTitleChange = (e) => {
    setRoleTitle(e.target.value);
  };

  const handlePermissionToggle = (category, action) => {
    setCheckedPermissions(prevState => {
      const newState = {
        ...prevState,
        [`${category}-${action}`]: !prevState[`${category}-${action}`]
      };
      updateGlobalChecks(newState);
      return newState;
    });
  };

  const handleGlobalToggle = (action) => {
    const newCheckedState = !globalChecks[action];
    setGlobalChecks(prevState => {
      const newGlobalChecks = {
        ...prevState,
        [action]: newCheckedState
      };
      updateCheckedPermissions(action, newCheckedState);
      return newGlobalChecks;
    });
  };

  const updateCheckedPermissions = (action, isChecked) => {
    const updatedPermissions = {};
    Object.keys(categoriesAndActions).forEach(category => {
      if (categoriesAndActions[category].includes(action)) {
        updatedPermissions[`${category}-${action}`] = isChecked;
      }
    });
    setCheckedPermissions(prevState => ({
      ...prevState,
      ...updatedPermissions
    }));
  };

  const updateGlobalChecks = (newCheckedPermissions) => {
    setGlobalChecks(prevState => {
      const updatedGlobalChecks = {};
      actions.forEach(action => {
        updatedGlobalChecks[action] = Object.keys(categoriesAndActions).every(category =>
          categoriesAndActions[category].includes(action) ?
          newCheckedPermissions[`${category}-${action}`] :
          true
        );
      });
      return updatedGlobalChecks;
    });
  };

  const handleUpdateRole = () => {
    if (!roleTitle) {
      console.error('Role title is required');
      return;
    }
    const roleData = {
      name: roleTitle,
      permissions: Object.keys(checkedPermissions).filter(permission => checkedPermissions[permission])
    };
    dispatch(updateRole({
      id : currentRole?._id,
      roleData
    }));
  };
  useEffect (() => {
    // Get permissions from the API
    dispatch(getActionsList())
  }, []);
  return (
    <DashboardLayout>
            <Breadcrumb
                items={[{ href: '/dashboard', label: 'Dashboard' }, {href: '/dashboard/roles', label: 'Roles'}, { label: 'Update' }]}
            />
    <div className="overflow-x-auto py-10">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={roleTitle}
          onChange={handleRoleTitleChange}
          placeholder="Enter role title"
          className="border rounded-md p-2 mr-2 w-full sm:w-1/3"
        />
        <button
          onClick={handleUpdateRole}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Update Role
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            {predefinedActions.map(action => (
              <th key={action} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={globalChecks[action] || false}
                    onChange={() => handleGlobalToggle(action)}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out mr-2"
                  />
                  {action}
                </div>
              </th>
            ))}
            {actions.filter(action => !predefinedActions.includes(action)).map(action => (
              <th key={action} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={globalChecks[action] || false}
                    onChange={() => handleGlobalToggle(action)}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out mr-2"
                  />
                  {action}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.keys(categoriesAndActions).map(category => (
            <tr key={category}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category}</td>
              {predefinedActions.map(action => (
                <td key={action} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {categoriesAndActions[category].includes(action) && (
                    <input
                      type="checkbox"
                      checked={!!checkedPermissions[`${category}-${action}`]}
                      onChange={() => handlePermissionToggle(category, action)}
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                  )}
                </td>
              ))}
              {actions.filter(action => !predefinedActions.includes(action)).map(action => (
                <td key={action} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {categoriesAndActions[category].includes(action) && (
                    <input
                      type="checkbox"
                      checked={!!checkedPermissions[`${category}-${action}`]}
                      onChange={() => handlePermissionToggle(category, action)}
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </DashboardLayout>
  );
};

export default EditRole;
