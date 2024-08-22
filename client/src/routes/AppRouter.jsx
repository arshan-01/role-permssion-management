// src/routes/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditRole from '../pages/dashboard/role/EditRole';
import AddPermissions from '../pages/dashboard/permission/AddPermissions';
import EditPermissions from '../pages/dashboard/permission/EditPermissions';
import RoleList from '../pages/dashboard/role/RoleList';
import CreateRole from '../pages/dashboard/role/CreateRole';
import Dashboard from '../pages/dashboard/dashboard/dashboard';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/role/create" element={<CreateRole />} />
        <Route path="/dashboard/role/update" element={<EditRole />} />
        <Route path="/dashboard/roles" element={<RoleList />} />
        <Route path="/dashboard/permission/add" element={<AddPermissions />} />
        <Route path="/dashboard/permission/update" element={<EditPermissions />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
