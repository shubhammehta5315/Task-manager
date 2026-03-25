const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Debug logs
console.log("MONGO_URI:", process.env.MONGO_URI ? "FOUND" : "MISSING");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "FOUND" : "MISSING");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Root
app.get("/", (req, res) => {
  res.send("API running...");
});

// Connect DB safely
connectDB().catch(err => {
  console.log("DB ERROR:", err.message);
});

// Prevent crash
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT ERROR:", err.message);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});