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
    status : {
      type: String,
      default: "active",
      enum : ["active", "inactive"]
    },
  },
  { timestamps: true },
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
