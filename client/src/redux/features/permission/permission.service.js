// src/redux/features/permission/permission.service.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import handleResponse from '../../../utils/responseHandler';
import { config } from '../../../utils/EndPoints';
import api from '../../../utils/Api';
// Thunks for permission operations
export const getPermissions = createAsyncThunk('permissions/getPermissions', async ({search, filter, currentPage, limit, sortColumn, sortOrder, isDeleted }) => {
  return handleResponse(api.get(config.endPoints.getPermissions, { params : { search, filter, currentPage, limit, sortColumn, sortOrder, isDeleted } }));
});

export const getActionsList = createAsyncThunk('permissions/getActionsList', async () => {
    return handleResponse(api.get(config.endPoints.getActionsList),{
        showSuccessToast: false,
        showErrorToast: true
    });
  });
  
export const getPermissionById = createAsyncThunk('permissions/getPermissionById', async (id) => {
  return handleResponse(api.get(`${config.endPoints.getPermissionById}/${id}`));
});

export const createPermission = createAsyncThunk('permissions/createPermission', async (permissionData) => {
  console.log("🚀 ~ createPermission ~ permissionData:", permissionData)
  return handleResponse(api.post(config.endPoints.createPermission, permissionData));
});

export const updatePermission = createAsyncThunk('permissions/updatePermission', async ({ id, permissionData }) => {
  return handleResponse(api.patch(`${config.endPoints.updatePermission}/${id}`, permissionData));
});

export const softDeletePermission = createAsyncThunk('permissions/softDeletePermission', async (id) => {
  return handleResponse(api.delete(`${config.endPoints.softDeletePermission}/${id}`));
});

export const parmanentDeletePermission = createAsyncThunk('permissions/parmanentDeletePermission', async (id) => {
  return handleResponse(api.delete(`${config.endPoints.parmanentDeletePermission}/${id}`));
});