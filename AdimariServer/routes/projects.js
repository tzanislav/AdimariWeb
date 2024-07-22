const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Configure AWS SDK v3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Configure multer to use multerS3 for uploading files to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
}).then( () => {
  console.log("Upload Complete");
});

// Function to delete an image from S3
const deleteImageFromS3 = async (imageKey) => {
  const deleteParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: imageKey,
  };

  try {
    await s3.send(new DeleteObjectCommand(deleteParams));
    console.log(`Image ${imageKey} deleted successfully from S3`);
  } catch (err) {
    console.error(`Failed to delete image ${imageKey} from S3:`, err);
  }
};

// @route   POST api/projects
// @desc    Create a new project
// @access  Public
router.post('/', upload.array('images', 10), async (req, res) => {
  const { name, status, type, area, location, description } = req.body;

  // Log the request body and files for debugging
  console.log('Request body:', req.body);
  console.log('Uploaded files:', req.files);

  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  const images = req.files.map((file) => file.location);

  try {
    const newProject = new Project({
      name,
      status,
      type,
      area,
      location,
      images,
      description,
    });

    const project = await newProject.save();
    console.log(project);

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
    console.log("Projects Hit");
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/projects/:id
// @desc    Update a project
// @access  Public
router.put('/:id', async (req, res) => {
  const { name, status, type, area, location, description, existingImages } = req.body;

  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Update the project details
    project.name = name || project.name;
    project.status = status || project.status;
    project.type = type || project.type;
    project.area = area || project.area;
    project.location = location || project.location;
    project.description = description || project.description;

    // Append existing images to the project
    images = await upload.array('images', 10);

    // Save the updated project
    project = await project.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Delete images from S3
    const deleteImagePromises = project.images.map(imageUrl => {
      const imageKey = imageUrl.split('/').pop(); // Extract image key from URL
      return deleteImageFromS3(imageKey);
    });

    await Promise.all(deleteImagePromises);

    await project.deleteOne({ _id: req.params.id });

    res.json({ msg: 'Project and its images removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
