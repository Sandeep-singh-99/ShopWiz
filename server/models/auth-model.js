const {Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authSchema = new Schema({
    imageUrl: {
        type: String,
    },

    cloudinaryId: {
        type: String,
    },

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true
    },
})

authSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})

authSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

authSchema.methods.generateToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_TOKEN, {expiresIn: "2h"})
}


const Auth = new model("auth", authSchema)

module.exports = Auth
