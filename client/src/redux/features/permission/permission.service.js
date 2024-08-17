// src/redux/features/permission/permission.service.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponse from '../../../utils/responseHandler';
import { config } from '../../../utils/EndPoints';
import api from '../../../utils/Api';
// Thunks for permission operations
export const getPermissions = createAsyncThunk('permissions/getPermissions', async () => {
  return handleResponse(api.get(config.endPoints.getPermissions));
});

export const getActionsList = createAsyncThunk('permissions/getActionsList', async () => {
    return handleResponse(api.get(config.endPoints.getActionsList));
  });
  
export const getPermissionById = createAsyncThunk('permissions/getPermissionById', async (id) => {
  return handleResponse(api.get(`${config.endPoints.getPermissionById}/${id}`));
});

export const createPermission = createAsyncThunk('permissions/createPermission', async (permissionData) => {
  return handleResponse(api.post(config.endPoints.createPermission, permissionData));
});

export const updatePermission = createAsyncThunk('permissions/updatePermission', async ({ id, permissionData }) => {
  return handleResponse(api.put(`${config.endPoints.updatePermission}/${id}`, permissionData));
});

export const deletePermission = createAsyncThunk('permissions/deletePermission', async (id) => {
  return handleResponse(api.delete(`${config.endPoints.deletePermission}/${id}`));
});
