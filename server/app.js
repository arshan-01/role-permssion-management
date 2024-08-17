import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./src/routes/index.js";
import { ApiError } from "./src/utils/apiUtils.js";
import swaggerUi from "swagger-ui-express"; // Make sure this is imported
import swaggerDocs from './swagger.js'; // Correct import

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(router); // Use the main router for your API routes

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      stack: err.stack,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      stack: err.stack,
    });
  }
});

export { app };
