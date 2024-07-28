require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const projects = require('./routes/projects');

const mongoConfig = {
  apiKey: process.env.MONGO_DB
};

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json({ extended: false }));

// Connect to MongoDB
mongoose.connect(mongoConfig.apiKey, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

app.use('/api/projects', projects);
app.use(express.static(path.join(__dirname, '../AdimariFrontEnd/build')));

// Test connection
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/test', (req, res) => {
  console.log('Test connection successful');
  res.send('Test connection successful');
});


// Define a simple route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../AdimariFrontEnd/build', 'index.html'));
});


const HTTP_PORT = process.env.HTTP_PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

// Create HTTP server
http.createServer(app).listen(HTTP_PORT, '0.0.0.0', () => {
  console.log(`HTTP Server is running on port ${HTTP_PORT}`);
});

// Create HTTPS server
if(process.env.NODE_ENV === 'development') {
  console.log('Not in production mode, skipping HTTPS server creation');
  return;
}
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/mesharch.studio/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/mesharch.studio/fullchain.pem'),
};

https.createServer(sslOptions, app).listen(HTTPS_PORT, '0.0.0.0', () => {
  console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
});
