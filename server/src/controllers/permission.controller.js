// controllers/permission.controller.js
import Permission from "../models/permission.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/apiUtils.js";

// Create a new permission
export const CreatePermission = asyncHandler(async (req, res, next) => {
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
export const GetAllPermissions = asyncHandler(async (req, res, next) => {
  try {
    const { isDeleted = false, currentPage = 1, limit = 10, search, filter, sortColumn, sortOrder } = req.query;
    // Build the query object
    const query = {}; 
    if (search) {
      query.module = { $regex: search, $options: "i" };
    }
    if (filter) {
      query.permissions = { $in: filter.split(",") };
    }
      query.isDeleted = isDeleted;
    // Build the sort object
    const sort = {};
    if (sortColumn && sortOrder) {
      sort[sortColumn] = sortOrder === "asc" ? 1 : -1;
    }
       // Fetch permission with pagination and sorting
       const permissions = await Permission.find(query)
       .sort(sort)  // Apply sorting here
       .limit(limit * 1)
       .skip((currentPage - 1) * limit);
 
     const total = await Permission.countDocuments(query);
 
     // Calculate the total number of pages
     const pages = Math.ceil(total / limit);
    res
      .status(200)
      .json(
        new ApiResponse(200, { permissions, pages, total}, "Permissions retrieved successfully"),
      );
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});

// Get action list of all permissions
export const GetPermissionsActionsList = asyncHandler(async (req, res, next) => {
  try {
    const permissions = await Permission.find({ status: "active", isDeleted: false }, 'actions'); // Retrieve only the 'actions' field
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
export const GetPermissionById = asyncHandler(async (req, res, next) => {
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
export const UpdatePermission = asyncHandler(async (req, res, next) => {
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
export const SoftDeletePermission = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const permission = await Permission.findByIdAndUpdate
    (
      id,
      { status: "inactive", isDeleted: true },
      { new: true },
    )
    if (!permission) return next(new ApiError(404, "Permission not found"));
    res
      .status(200)
      .json(new ApiResponse(200, null, "Permission deleted successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});

// RestorePermission,
export const RestorePermission = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const permission = await Permission.findByIdAndUpdate
    (
      id,
      { status: "active", isDeleted: false },
      { new: true },
    )
    if (!permission) return next(new ApiError(404, "Permission not found"));
    res
      .status(200)
      .json(new ApiResponse(200, null, "Permission restored successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }});

// PermanentDeletePermission,
export const PermanentDeletePermission = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const permission = await Permission.findByIdAndDelete(id);
    if (!permission) return next(new ApiError(404, "Permission not found"));
    res
      .status(200)
      .json(new ApiResponse(200, null, "Permission deleted permanently"));
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});