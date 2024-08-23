// controllers/role.controller.js
import Role from "../models/role.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/apiUtils.js";

// Create a new role
export const CreateRole = asyncHandler(async (req, res, next) => {
  const { name, permissions } = req.body;
  try {
    // Check if role already exists
    const roleExist = await Role.findOne({ name });
    if (roleExist) {
      return next(new ApiError(400, "Role already exists"));
    }
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
// Get all roles
export const GetAllRoles = asyncHandler(async (req, res, next) => {
  try {
    const { isDeleted = false, currentPage = 1, limit = 10, search, filter, sortColumn, sortOrder } = req.query;
    // Build the query object
    const query = {}; 
    if (search) {
      query.name = { $regex: search, $options: "i" };
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

    // Fetch roles with pagination and sorting
    const roles = await Role.find(query)
      .sort(sort)  // Apply sorting here
      .limit(limit * 1)
      .skip((currentPage - 1) * limit);

    const total = await Role.countDocuments(query);

    // Calculate the total number of pages
    const pages = Math.ceil(total / limit);

    res
      .status(200)
      .json(new ApiResponse(200, { roles, total, pages }, "Roles retrieved successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});


// Get role by ID
export const GetRoleById = asyncHandler(async (req, res, next) => {
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
export const UpdateRole = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status, name, permissions } = req.body;
  try {
    // Check if role already exists but exclude the current role
    const roleExist = await Role.findOne({ name, _id: { $ne: id } });
    if (roleExist) {
      return next(new ApiError(400, "Role already exists"));
    }
    // Update role
    const role = await Role.findByIdAndUpdate(
      id,
      { name, permissions, status },
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
export const SoftDeleteRole = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    // soft delete role and status to inactive
    const role = await Role.findByIdAndUpdate(id, { status: "inactive", isDeleted: true }, { new: true });
    if (!role) return next(new ApiError(404, "Role not found"));
    res
      .status(200)
      .json(new ApiResponse(200, null, "Role deleted successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});

// Restore role by ID
export const RestoreRole = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    // Restore role and status to active
    const role = await Role.findByIdAndUpdate(id, { status: "active", isDeleted: false }, { new: true });
    if (!role) return next(new ApiError(404, "Role not found"));
    res
      .status(200)
      .json(new ApiResponse(200, null, "Role restored successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});

// Parmanently delete role by ID
export const PermanentDeleteRoleController = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    // Parmanently delete role
    const role = await Role.findByIdAndDelete(id);
    if (!role) return next(new ApiError(404, "Role not found"));
    res
      .status(200)
      .json(new ApiResponse(200, null, "Role deleted permanently"));
  } catch (error) {
    next(new ApiError(500, "Internal server error", [error.message]));
  }
});