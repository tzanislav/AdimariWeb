require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const projects = require('./routes/projects');


const mongoConfig =
{
  apiKey : process.env.MONGO_DB
}


const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000'  // Adjust this if your front end uses a different URL or port
}));
app.use(express.json({ extended: false }));


// Connect to MongoDB
mongoose.connect(mongoConfig.apiKey, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .then(() => console.log(mongoose.connection.readyState))
  .catch(err => console.error(err));


app.use('/api/projects', projects);
app.use(express.static(path.join(__dirname, '../AdimariFrontEnd/build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../AdimariFrontEnd/build', 'index.html'));
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('API is running...');

});

// Test connection
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});
app.get('/test', (req, res) => {
  console.log('Test connection successful');
  res.send('Test connection successful');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});