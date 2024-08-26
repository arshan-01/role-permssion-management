import mongoose from 'mongoose'
const { Schema, model } = mongoose

const generalSettingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    colors: {
      type: [String], // Define colors as an array of strings
      required: true // Ensure colors is required
    },
    maintenance: {
      type: Boolean,
      default: false
    },
    logo: {
      type: String,
      required: true
    },
    favicon: {
      type: String,
      required: true
    },
    // Additional Settings
    primaryColor: {
      type: String,
      default: '#000000' // Default color
    },
    secondaryColor: {
      type: String,
      default: '#FFFFFF' // Default color
    },
    logoUrl: {
      type: String,
      default: '' // URL of the logo
    },
    faviconUrl: {
      type: String,
      default: '' // URL of the favicon
    }
  },
  { timestamps: true }
)

const GeneralSetting = model('GeneralSetting', generalSettingSchema)

export default GeneralSetting
