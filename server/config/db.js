const mongoose = require("mongoose");
const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connection SUCCESS")
    } catch (error) {
        process.exit(1)
    }
}

module.exports = ConnectDB
