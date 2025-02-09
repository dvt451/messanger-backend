const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define a simple User schema (for example)
const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// MongoDB connection (replace with your MongoDB Atlas URI or local MongoDB URI)
mongoose.connect('mongodb+srv://admin:Admin1@cluster0.9prnm.mongodb.net/chat?retryWrites=true&w=majority', { useNewUrlParser: false, useUnifiedTopology: fa })
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.log('Error connecting to MongoDB:', err));

// GET route to fetch user data
router.get('/', async (req, res) => {
	try {
		const user = await User.findOne();  // Find the first user (you may want to refine this query)
		if (user) {
			res.json(user);  // Send the user data
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
});

// PUT route to update user data (name)
router.put('/', async (req, res) => {
	const { name } = req.body;  // Extract the new name from the request body
	if (name) {
		try {
			let user = await User.findOne();  // Find the user (you might want to use a better query here)
			if (!user) {
				user = new User({ name });  // If no user found, create a new user
				await user.save();  // Save the new user
			} else {
				user.name = name;  // Update the name if the user exists
				await user.save();  // Save the updated user
			}
			res.json({ name: user.name });  // Respond with the updated user data
		} catch (error) {
			res.status(500).json({ message: 'Error updating user data' });
		}
	} else {
		res.status(400).json({ message: 'Name is required' });
	}
});

module.exports = router;
