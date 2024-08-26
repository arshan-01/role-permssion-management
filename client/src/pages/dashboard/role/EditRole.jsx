import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Breadcrumb from '../../../components/BreadCrumb/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getActionsList } from '../../../redux/features/permission/permission.service';
import { getRoleById, updateRole } from '../../../redux/features/role/role.service';
import { updateRoleOnLocal } from '../../../redux/features/role/role.slice';

const EditRole = () => {
  const dispatch = useDispatch();
  const currentRole = useSelector(state => state?.role?.currentRole) || [];
  const currentRoleId = useSelector(state => state?.role?.currentRoleId) || [];
  const permissions = useSelector(state => state?.permission?.actionList) || [];
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
  }, [currentRoleId, currentRole]);
  const handleRoleTitleChange = (e) => {
    dispatch(updateRoleOnLocal({ id: currentRoleId, role: { name: e.target.value } }));
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
    // if (!roleTitle) {
    //   console.error('Role title is required');
    //   return;
    // }
    const role = {
      name: currentRole?.name,
      status: currentRole?.status,
      permissions: Object.keys(checkedPermissions).filter(permission => checkedPermissions[permission])
    };
    dispatch(updateRole({
      id: currentRoleId,
      role,
    }));
  };
  useEffect(() => {
    // Get permissions from the API
    dispatch(getActionsList())
    .unwrap()
    .then(() => {
      dispatch(getRoleById(currentRoleId))    })
  }, [dispatch, currentRoleId]);
  // Get role by currentRoleId
  // useEffect(() => {
  //   dispatch(getRoleById(currentRoleId))
  // }, [currentRoleId]);

  // Update role status
  const toggleActiveState = () => {
    dispatch(updateRoleOnLocal({ id: currentRoleId, role: { status: currentRole?.status === "active" ? "inactive" : "active" } }));
  };
  return (
    <DashboardLayout>
      <Breadcrumb
        items={[{ href: '/dashboard', label: 'Dashboard' }, { href: '/dashboard/roles', label: 'Roles' }, { label: 'Update' }]}
      />
      <div className="overflow-x-auto py-10">
      <div className="mb-4 flex items-center">
      <input
        type="text"
        value={currentRole?.name}
        onChange={handleRoleTitleChange}
        placeholder="Enter role title"
        className="border rounded-md p-2 mr-2 w-full sm:w-1/3"
      />
      <button
        onClick={handleUpdateRole}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mr-2"
      >
        Update Role
      </button>
      <div className="flex items-center space-x-2 mx-9">
        <span className="text-gray-7">{currentRole?.status == "active" ? "Active" : "Inactive"}</span>
        <button
          onClick={toggleActiveState}
          className={`relative inline-flex items-center h-6 rounded-full w-12 ${
            currentRole?.status == "active" ? "bg-green-500" : "bg-gray-3"
          } transition-colors duration-200 ease-in-out`}
        >
          <span
            className={`absolute inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
              currentRole?.status == "inactive" ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-1">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase tracking-wider">Category</th>
              {predefinedActions.map(action => (
                <th key={action} className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase tracking-wider">
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
                <th key={action} className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase tracking-wider">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-9">{category}</td>
                {predefinedActions.map(action => (
                  <td key={action} className="px-6 py-4 whitespace-nowrap text-sm text-gray-5">
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
                  <td key={action} className="px-6 py-4 whitespace-nowrap text-sm text-gray-5">
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
