// controllers/permission.controller.js
import Permission from "../models/permission.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/apiUtils.js";

// Create a new permission
export const createPermission = asyncHandler(async (req, res, next) => {
  const { module, actions } = req.body;
  try {
    const permissionExist = await Permission.findOne({ module });
    if (permissionExist) {
      return next(new ApiError(400, "Permission already exists"));
    }
    const permission = new Permission({ module, actions });
    await permission.save();
    res
      .status(201)
      .json(
        new ApiResponse(201, permission, "Permission created successfully"),
      );
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});

// Get all permissions
export const getAllPermissions = asyncHandler(async (req, res, next) => {
  try {
    const permissions = await Permission.find();
    res
      .status(200)
      .json(
        new ApiResponse(200, permissions, "Permissions retrieved successfully"),
      );
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});

// Get action list of all permissions
export const getPermissionsList = asyncHandler(async (req, res, next) => {
  try {
    const permissions = await Permission.find({}, 'actions'); // Retrieve only the 'actions' field
    const actionSet = new Set();
    // Flatten the actions array
    permissions.forEach(permission => {
      permission.actions.forEach(action => actionSet.add(action));
    });

    const actionList = Array.from(actionSet);
    res
      .status(200)
      .json(
        new ApiResponse(200, actionList, "Action list retrieved successfully"),
      );
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});
// Get permission by ID
export const getPermissionById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const permission = await Permission.findById(id);
    if (!permission) return next(new ApiError(404, "Permission not found"));
    res
      .status(200)
      .json(
        new ApiResponse(200, permission, "Permission retrieved successfully"),
      );
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});

// Update permission by ID
export const updatePermission = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { module, actions } = req.body;
  try {
    const permission = await Permission.findByIdAndUpdate(
      id,
      { module, actions },
      { new: true },
    );
    if (!permission) return next(new ApiError(404, "Permission not found"));
    res
      .status(200)
      .json(
        new ApiResponse(200, permission, "Permission updated successfully"),
      );
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});

// Delete permission by ID
export const deletePermission = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const permission = await Permission.findByIdAndDelete(id);
    if (!permission) return next(new ApiError(404, "Permission not found"));
    res
      .status(200)
      .json(new ApiResponse(200, null, "Permission deleted successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});
