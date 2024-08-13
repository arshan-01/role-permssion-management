// controllers/role.controller.js
import Role from "../models/role.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/apiUtils.js";

// Create a new role
export const createRole = asyncHandler(async (req, res, next) => {
  const { name, permissions } = req.body;
  try {
    const role = new Role({ name, permissions });
    await role.save();
    res
      .status(201)
      .json(new ApiResponse(201, role, "Role created successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});

// Get all roles
export const getAllRoles = asyncHandler(async (req, res, next) => {
  try {
    const roles = await Role.find();
    res
      .status(200)
      .json(new ApiResponse(200, roles, "Roles retrieved successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});

// Get role by ID
export const getRoleById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const role = await Role.findById(id);
    if (!role) return next(new ApiError(404, "Role not found"));
    res
      .status(200)
      .json(new ApiResponse(200, role, "Role retrieved successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});

// Update role by ID
export const updateRole = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, permissions } = req.body;
  try {
    const role = await Role.findByIdAndUpdate(
      id,
      { name, permissions },
      { new: true },
    );
    if (!role) return next(new ApiError(404, "Role not found"));
    res
      .status(200)
      .json(new ApiResponse(200, role, "Role updated successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});

// Delete role by ID
export const deleteRole = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const role = await Role.findByIdAndDelete(id);
    if (!role) return next(new ApiError(404, "Role not found"));
    res
      .status(200)
      .json(new ApiResponse(200, null, "Role deleted successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});
