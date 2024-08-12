// routes/index.js
import express from 'express';
import permissionRoutes from './permission.routes.js';

const router = express.Router();

// Define routes
router.use('/permission', permissionRoutes);

export default router;
