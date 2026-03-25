const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  const project = await Project.create({
    ...req.body,
    userId: req.user,
  });
  res.json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ userId: req.user });
  res.json(projects);
};

exports.getProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project);
};