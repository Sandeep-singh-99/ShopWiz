const { Schema, model } = require("mongoose");

const adminScheam = new Schema({
    userId: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
})

adminScheam.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})

adminScheam.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}


const Admin = new model('admin', adminScheam)

module.exports = Admin