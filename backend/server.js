const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv"); // Add dotenv for environment variables

dotenv.config({ path: "./Config/config.env" });

// Import the connectToDatabase function from the database configuration file
const connectToDatabase = require("./Config/databse");

// import Both Model and Routes of User
const UserModel = require("./Models/User");
const UserApi = require('./Routes/User.routes');

// import Both Model and Routes of usernotes
const UserNotes = require("./Models/UserNotes");
const NotesApi = require('./Routes/UserNotes.routes');

const app = express();

// if you want to use json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON data in the request body

const PORT = process.env.PORT || 4000; // Use environment variable for port

// Call the connectToDatabase function to establish the database connection
connectToDatabase();

// ROUTE --> API For user Register/LOGIN
app.use("/", UserApi);

// Route ----> API for User Notes
app.use("/", NotesApi);

app.get("/", (req, res) => {
  res.send("Server is working Afshan");
});

app.listen(PORT, () => {
  console.log(`Server is working on port http://localhost:${PORT}`);
});
