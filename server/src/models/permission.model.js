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
    ]
}, { timestamps: true });

// Create the Permission model
const Permission = model('Permission', permissionSchema);

export default Permission;
