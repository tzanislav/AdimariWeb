const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const projects = require('./routes/projects');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));


// Connect to MongoDB
mongoose.connect('mongodb+srv://tzani:grilleD123@adimaricluster.xo73tnf.mongodb.net/?retryWrites=true&w=majority&appName=adimariCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error(err));


app.use('/api/projects', projects);


// Define a simple route
app.get('/', (req, res) => {
  res.send('API is running...');

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});