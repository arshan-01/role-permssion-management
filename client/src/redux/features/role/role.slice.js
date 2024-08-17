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
      .addCase(getRoles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.roles = action.payload;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getRoleById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRoleById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentRole = action.payload;
      })
      .addCase(getRoleById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex(role => role._id === action.payload._id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter(role => role._id !== action.payload._id);
      });
  }
});

export default roleSlice.reducer;
