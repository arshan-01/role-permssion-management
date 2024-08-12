import express from 'express';
import {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    deletePermission
} from '../controllers/permission.controller.js';

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
router.post('/create', createPermission);

/**
 * @swagger
 * /permission:
 *   get:
 *     summary: Retrieve all permissions
 *     tags: [Permissions]
 *     responses:
 *       200:
 *         description: List of permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   module:
 *                     type: string
 *                   actions:
 *                     type: array
 *                     items:
 *                       type: string
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllPermissions);

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
router.get('/:id', getPermissionById);

/**
 * @swagger
 * /permission/{id}:
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
router.patch('/:id', updatePermission);

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
router.delete('/:id', deletePermission);

export default router;
