// src/redux/features/role/role.service.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponse from '../../../utils/responseHandler';
import api from '../../../utils/Api';
import { config } from '../../../utils/EndPoints';

// Thunks for role operations
export const getRoles = createAsyncThunk('roles/getRoles', async () => {
  return handleResponse(api.get(config.endPoints.getRoles));
});

export const getRoleById = createAsyncThunk('roles/getRoleById', async (id) => {
  return handleResponse(api.get(`${config.endPoints.getRoleById}/${id}`));
});

export const createRole = createAsyncThunk('roles/createRole', async (roleData) => {
  return handleResponse(api.post(config.endPoints.createRole, roleData));
});

export const updateRole = createAsyncThunk('roles/updateRole', async ({ id, roleData }) => {
  return handleResponse(api.put(`${config.endPoints.updateRole}/${id}`, roleData));
});

export const deleteRole = createAsyncThunk('roles/deleteRole', async (id) => {
  return handleResponse(api.delete(`${config.endPoints.deleteRole}/${id}`));
});

