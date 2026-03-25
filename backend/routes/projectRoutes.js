const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  getProject,
} = require("../controllers/projectController");

router.post("/", auth, createProject);
router.get("/", auth, getProjects);
router.get("/:id", auth, getProject);

module.exports = router;