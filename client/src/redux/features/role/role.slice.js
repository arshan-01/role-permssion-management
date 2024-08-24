// src/redux/features/role/role.slice.js
import { createSlice, current } from '@reduxjs/toolkit';
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  softDeleteRole,
  parmanentDeleteRole,
  restoreRole
} from './role.service';

const roleSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    currentRole: null,
    currentRoleId : null,
    status: 'idle',
    error: null
  },
  reducers: {
    setCurrentRoleId: (state, action) => {
      state.currentRoleId = action.payload;
    },
    clearCurrentRole: (state) => {
      state.currentRole = null;
    },
    updateRoleOnLocal : (state, action) => {
      const {role } = action.payload;
      state.currentRole  = { ...state.currentRole, ...role };
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Roles
      .addCase(getRoles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.roles = action.payload.data;
        state.currentRole = null;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Get Role by ID
      .addCase(getRoleById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRoleById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentRole = action.payload.data;
      })
      .addCase(getRoleById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Create Role
      .addCase(createRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(createRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Update Role
      .addCase(updateRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentRole = action.payload.data;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Soft Delete Role
      .addCase(softDeleteRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(softDeleteRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(softDeleteRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Parmanent Delete Role
      .addCase(parmanentDeleteRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(parmanentDeleteRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(parmanentDeleteRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Delete Role
      .addCase(restoreRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(restoreRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(restoreRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});
export const { setCurrentRoleId, clearCurrentRole, updateRoleOnLocal } = roleSlice.actions;
export default roleSlice.reducer;
