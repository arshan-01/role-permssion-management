import express from 'express';
import {
  CreateRole,
  GetAllRoles,
  GetRoleById,
  UpdateRole,
  SoftDeleteRole,
  PermanentDeleteRoleController,
  RestoreRole
} from '../controllers/role.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management
 */

/**
 * @swagger
 * /role/create:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Admin
 *               status:
 *                 type: string
 *                 example: active
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: product-create
 *                 example: ['product-create', 'user-update', 'role-read']
 *     responses:
 *       201:
 *         description: Role created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/create', CreateRole);

/**
 * @swagger
 * /role/all:
 *   get:
 *     summary: Retrieve all roles with optional filters, sorting, and pagination
 *     tags: [Roles]
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
 *         description: Search by role name
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
 *         description: Roles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d9f8f1f71b2c001c8e4e8d
 *                       name:
 *                         type: string
 *                         example: Admin
 *                       permissions:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: product-create
 *                   example: 
 *                     - _id: 60d9f8f1f71b2c001c8e4e8d
 *                       name: Admin
 *                       permissions: ['product-create', 'user-update', 'role-read']
 *                     - _id: 60d9f8f1f71b2c001c8e4e8e
 *                       name: User
 *                       permissions: ['user-read', 'product-read']
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
router.get('/all', GetAllRoles);

/**
 * @swagger
 * /role/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d9f8f1f71b2c001c8e4e8d
 *                 name:
 *                   type: string
 *                   example: Admin
 *                 permissions:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: product-create
 *                   example: ['product-create', 'user-update', 'role-read']
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', GetRoleById);

/**
 * @swagger
 * /role/update/{id}:
 *   patch:
 *     summary: Update a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Admin
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: product-create
 *                 example: ['product-create', 'user-update', 'role-read']
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.patch('/update/:id', UpdateRole);

/**
 * @swagger
 * /role/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', SoftDeleteRole);


/**
 * @swagger
 * /role/restore/{id}:
 *   patch:
 *     summary: Restore a soft-deleted role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role restored successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.patch('/restore/:id', RestoreRole);

/**
 * @swagger
 * /role/delete/{id}:
 *   delete:
 *     summary: Permanently delete a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted permanently
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', PermanentDeleteRoleController);

export default router;
