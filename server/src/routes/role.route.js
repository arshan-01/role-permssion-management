import express from 'express';
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
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
 * /role:
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
router.post('/', createRole);

/**
 * @swagger
 * /role:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Roles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 60d9f8f1f71b2c001c8e4e8d
 *                   name:
 *                     type: string
 *                     example: Admin
 *                   permissions:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: product-create
 *                     example: ['product-create', 'user-update', 'role-read']
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllRoles);

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
router.get('/:id', getRoleById);

/**
 * @swagger
 * /role/{id}:
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
router.patch('/:id', updateRole);

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
router.delete('/:id', deleteRole);

export default router;
