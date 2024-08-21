// src/redux/features/role/role.slice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
} from './role.service';

const roleSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    currentRole: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Roles
      .addCase(getRoles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.roles = action.payload.data;
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
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Delete Role
      .addCase(deleteRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default roleSlice.reducer;
