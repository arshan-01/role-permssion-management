// Import all routes here and use them in the app
// routes/index.js
import express from "express";
import permissionRoutes from "./permission.routes.js";
import roleRoute from "./role.routes.js";
// Import other route modules here
// import userRoutes from './userRoutes.js';
// import anotherRoutes from './anotherRoutes.js';

const app = express.Router();

// Define routes
app.use('/permission', permissionRoutes);
app.use("/role", roleRoute);
// Add other routes here
// router.use('/users', userRoutes);
// router.use('/another', anotherRoutes);

export default app;
