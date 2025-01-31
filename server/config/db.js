// const mongoose = require("mongoose");
// const ConnectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log("MongoDB connection Success")
//     } catch (error) {
//         process.exit(1)
//     }
// }

// module.exports = ConnectDB

const mongoose = require("mongoose");

let isConnected = false; // To prevent multiple connections

async function ConnectDB(retries = 5, delay = 5000) {
  if (isConnected) {
    console.log("Using existing MongoDB connection.");
    return;
  }

  while (retries > 0) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      isConnected = true;
      console.log("✅ MongoDB Connected Successfully!");
      return;
    } catch (error) {
      console.error(`🚨 MongoDB Connection Failed! Retries left: ${retries - 1}`);
      console.error(error.message);

      retries -= 1;
      if (retries === 0) {
        console.error("❌ MongoDB Connection Failed. Exiting application...");
        process.exit(1);
      }

      console.log(`⏳ Retrying connection in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
    }
  }
}

module.exports = ConnectDB;
