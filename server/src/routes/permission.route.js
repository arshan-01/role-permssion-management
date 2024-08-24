import express from "express";
import {
  CreatePermission,
  GetAllPermissions,
  GetPermissionById,
  UpdatePermission,
  SoftDeletePermission,
  RestorePermission,
  PermanentDeletePermission,
  GetPermissionsActionsList,
} from "../controllers/permission.controller.js";

const router = express.Router();
/**
 * @swagger
 * /permission/create:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               module:
 *                 type: string
 *                 example: "role"
 *               actions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "role-create"
 *     responses:
 *       201:
 *         description: Permission created
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post("/create", CreatePermission);

/**
 * @swagger
 * /permission/all:
 *   get:
 *     summary: Retrieve all permissions with optional filters, sorting, and pagination
 *     tags: [Permissions]
 *     parameters:
 *       - in: query
 *         name: isDeleted
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Filter by deleted status (default is false)
 *       - in: query
 *         name: currentPage
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The current page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of records per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter by permissions (comma-separated list)
 *       - in: query
 *         name: sortColumn
 *         schema:
 *           type: string
 *         description: Column name to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (asc for ascending, desc for descending)
 *     responses:
 *       200:
 *         description: List of permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 permissions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       module:
 *                         type: string
 *                       actions:
 *                         type: array
 *                         items:
 *                           type: string
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 totalRecords:
 *                   type: integer
 *                   description: Total number of records
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get("/all", GetAllPermissions);

/**
 * @swagger
 * /permission/actions-list:
 *   get:
 *     summary: Retrieve a flat list of all permission actions
 *     tags: [Permissions]
 *     responses:
 *       200:
 *         description: List of all permission actions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "role-create"
 *       500:
 *         description: Internal server error
 */
router.get("/actions-list", GetPermissionsActionsList);
/**
 * @swagger
 * /permission/{id}:
 *   get:
 *     summary: Retrieve a single permission by ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the permission
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Permission found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 module:
 *                   type: string
 *                 actions:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", GetPermissionById);

/**
 * @swagger
 * /permission/update/{id}:
 *   patch:
 *     summary: Update a permission by ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the permission
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               module:
 *                 type: string
 *                 example: "role"
 *               actions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "role-create"
 *     responses:
 *       200:
 *         description: Permission updated
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Internal server error
 */
router.patch("/update/:id", UpdatePermission);

/**
 * @swagger
 * /permission/{id}:
 *   delete:
 *     summary: Delete a permission by ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the permission
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", SoftDeletePermission);

/**
 * @swagger
 * /permission/restore/{id}:
 *   patch:
 *     summary: Restore a soft-deleted permission by ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the permission to restore
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Permission restored successfully
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Internal server error
 */
router.patch("/restore/:id", RestorePermission);

/**
 * @swagger
 * /permission/delete/{id}:
 *   delete:
 *     summary: Permanently delete a permission by ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the permission to delete permanently
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Permission deleted permanently
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", PermanentDeletePermission);

export default router;
