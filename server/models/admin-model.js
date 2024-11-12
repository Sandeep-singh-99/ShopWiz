const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true, // Ensure the userId is unique
    },

    password: {
        type: String,
        required: true,
    }
});

const Admin = model('Admin', adminSchema);  // Change to use model name 'Admin' instead of 'admin'

module.exports = Admin;
