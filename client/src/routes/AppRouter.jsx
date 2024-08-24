// src/routes/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditRole from '../pages/dashboard/role/EditRole';
import CreateRole from '../pages/dashboard/role/CreateRole';
import Dashboard from '../pages/dashboard/dashboard/dashboard';
import RoleTrash from '../pages/dashboard/role/RoleTrash';
import Roles from '../pages/dashboard/role/Roles';
import Permissions from '../pages/dashboard/permission/Permissions';
import PermissionTrash from '../pages/dashboard/permission/permissionTrash';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/role/create" element={<CreateRole />} />
        <Route path="/dashboard/role/update" element={<EditRole />} />
        <Route path="/dashboard/roles/trash" element={<RoleTrash />} />
        <Route path="/dashboard/roles" element={<Roles />} />
        <Route path="/dashboard/permissions" element={<Permissions />} />
        <Route path="/dashboard/permissions/trash" element={<PermissionTrash />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
