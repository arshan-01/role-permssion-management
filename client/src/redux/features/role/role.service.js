// src/redux/features/role/role.service.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponse from '../../../utils/responseHandler';
import api from '../../../utils/Api';
import { config } from '../../../utils/EndPoints';

// Thunks for role operations
export const getRoles = createAsyncThunk('roles/getRoles', async ({search, filter, currentPage, limit, sortColumn, sortOrder, isDeleted  }) => {
  return handleResponse(api.get(config.endPoints.getRoles, { params: { search, filter, currentPage, limit, sortColumn, sortOrder, isDeleted} }));
});

export const getRoleById = createAsyncThunk('roles/getRoleById', async (id) => {
  return handleResponse(api.get(`${config.endPoints.getRoleById}/${id}`));
});

export const createRole = createAsyncThunk('roles/createRole', async (roleData) => {
  return handleResponse(api.post(config.endPoints.createRole, roleData));
});

export const updateRole = createAsyncThunk('roles/updateRole', async ({ id, role }) => {
  return handleResponse(api.patch(`${config.endPoints.updateRole}/${id}`, role));
});

export const softDeleteRole = createAsyncThunk('roles/softDeleteRole', async (id) => {
  return handleResponse(api.delete(`${config.endPoints.softDeleteRole}/${id}`));
});

export const parmanentDeleteRole = createAsyncThunk('roles/parmanentDeleteRole', async (id) => {
  return handleResponse(api.delete(`${config.endPoints.parmanentDeleteRole}/${id}`));
});

export const restoreRole = createAsyncThunk('roles/restoreRole', async (id) => {
  return handleResponse(api.patch(`${config.endPoints.restoreRole}/${id}`));
});