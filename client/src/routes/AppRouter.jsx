import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddRole from '../role/AddRole';
import EditRole from '../role/EditRole';
import AddPermissions from '../permission/AddPermissions';
import EditPermissions from '../permission/EditPermissions';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddRole />} />
        <Route path="/role/edit" element={<EditRole />} />
        <Route path="/permission/add" element={<AddPermissions />} />
        <Route path="/permission/edit" element={<EditPermissions />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
