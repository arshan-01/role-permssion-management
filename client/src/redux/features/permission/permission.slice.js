// src/redux/features/permission/permission.slice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  getPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission,
  getActionsList
} from './permission.service';

const permissionSlice = createSlice({
  name: 'permissions',
  initialState: {
    permissions: [],
    actionList: [],
    currentPermission: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all permissions
      .addCase(getPermissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.permissions = action.payload;
      })
      .addCase(getPermissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Get all actions
        .addCase(getActionsList.pending, (state, action) => {
            state.status = 'loading';
            }
        )
        .addCase(getActionsList.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.actionList = action.payload.data;
        }
        )
        .addCase(getActionsList.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
        )
      // Get a single permission by ID
      .addCase(getPermissionById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPermissionById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentPermission = action.payload;
      })
      .addCase(getPermissionById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Create a new permission
      .addCase(createPermission.fulfilled, (state, action) => {
        state.permissions.push(action.payload);
      })
      // Update a permission
      .addCase(updatePermission.fulfilled, (state, action) => {
        const index = state.permissions.findIndex(permission => permission._id === action.payload._id);
        if (index !== -1) {
          state.permissions[index] = action.payload;
        }
      })
      // Delete a permission
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.permissions = state.permissions.filter(permission => permission._id !== action.payload._id);
      });
  }
});

export default permissionSlice.reducer;
