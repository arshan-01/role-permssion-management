// src/routes/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddRole from '../pages/dashboard/role/AddRole';
import EditRole from '../pages/dashboard/role/EditRole';
import AddPermissions from '../pages/dashboard/permission/AddPermissions';
import EditPermissions from '../pages/dashboard/permission/EditPermissions';
import RoleList from '../pages/dashboard/role/RoleList';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddRole />} />
        <Route path="/role/edit" element={<EditRole />} />
        <Route path="/roles" element={<RoleList />} />
        <Route path="/permission/add" element={<AddPermissions />} />
        <Route path="/permission/edit" element={<EditPermissions />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
