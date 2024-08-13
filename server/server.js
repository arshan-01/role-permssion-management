// server.js is the entry point of the application. It is the file that will be executed when you run the application. It is responsible for starting the server and connecting to the database. It also loads environment variables from the .env file and imports the app from app.js.
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!", err);
  });
