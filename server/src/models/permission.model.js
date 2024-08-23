import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the Permission schema
const permissionSchema = new Schema({
  module: {
    type: String,
    required: true,
    trim: true
  },
  actions: [
    {
      type: String,
      trim: true
    }
  ],
  isDeleted: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive']
  }
}, { timestamps: true });

// Create the Permission model
const Permission = model("Permission", permissionSchema);

export default Permission;
