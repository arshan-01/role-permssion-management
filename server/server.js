// server.js is the entry point of the application. It is the file that will be executed when you run the application. It is responsible for starting the server and connecting to the database. It also loads environment variables from the .env file and imports the app from app.js.
import connectDB from "./src/config/db.config.js";  // Adjust the path as needed
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!", err);
  });
