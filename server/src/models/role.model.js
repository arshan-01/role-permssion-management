import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: {
      type: [String], // Define permissions as an array of strings
      required: true, // Ensure permissions is required
    },
  },
  { timestamps: true },
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
