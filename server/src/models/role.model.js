import mongoose from 'mongoose'
const { Schema, model } = mongoose

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    permissions: {
      type: [String], // Define permissions as an array of strings
      required: true // Ensure permissions is required
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'inactive']
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const Role = model('Role', roleSchema)

export default Role
