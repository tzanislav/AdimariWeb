// models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  //Type of project
  type: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: false,
  },
  area: {
    type: Number, // Assuming area is a numerical value
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of image URLs or paths
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
