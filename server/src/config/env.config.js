// Load environment variables
import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
  });
// Define environment variables
const {
  NODE_ENV,
  MONGODB_URI,
  PASS_SECRET,
  JWT_SECRET,
  PORT,
  EMAIL,
  PASSWORD,
  CORS_ORIGIN,
  CLIENT_URL,
} = process.env;

// Export environment variables
export {
  NODE_ENV,
  MONGODB_URI,
  PASS_SECRET,
  JWT_SECRET,
  PORT,
  EMAIL,
  PASSWORD,
  CORS_ORIGIN,
  CLIENT_URL,
};
