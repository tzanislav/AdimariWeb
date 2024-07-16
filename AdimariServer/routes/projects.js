// routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');


// @route   POST api/projects
// @desc    Create a new project
// @access  Public
router.post('/',async (req, res) => {
  const { name, status, area, location, description } = req.body;
  const images = [];

  try {
    const newProject = new Project({
      name,
      status,
      area,
      location,
      images,
      description,
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
