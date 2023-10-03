const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Import dotenv for environment variables

dotenv.config({ path: "./Config/config.env" });

// Database URL from environment variables
const dbURL = process.env.MONGODB_URI;

// Database connection options
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Create a function to connect to the database
async function connectToDatabase() {
  try {
    await mongoose.connect(dbURL, dbOptions);
    console.log("MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error.message);
  }
}

module.exports = connectToDatabase; // export to server.js file
