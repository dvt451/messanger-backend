const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // If needed for cross-origin requests
const userRoutes = require('./routes/user');  // Import user routes

const app = express();
app.use(cors());  // Enable CORS if necessary
app.use(express.json());  // Middleware to parse JSON bodies

// Connect to MongoDB
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.log('Error connecting to MongoDB:', err));


// Register the user routes
app.use('/user', userRoutes);  // This will make the route available at /user

// Start the server
app.listen(5000, () => {
	console.log('Server is running on port 5000');
});
