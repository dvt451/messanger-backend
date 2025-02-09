const express = require('express');
const User = require('../models/User');  // Import the User model
const router = express.Router();

// GET route to fetch user data based on role
router.get('/:role', async (req, res) => {
	try {
		// Find the user by role from the database
		const user = await User.findOne({ role: req.params.role });

		if (user) {
			// If user is found, send the user data
			res.json(user);
		} else {
			// If user is not found, send a 404 error
			res.status(404).json({ message: 'User not found' });
		}
	} catch (err) {
		// Handle any database connection or query errors
		res.status(500).json({ message: 'Error retrieving user' });
	}
});

// PUT route to update user data (name) based on role
router.put('/:role', async (req, res) => {
	try {
		const { name } = req.body;

		// Find the user by role and update their name
		const updatedUser = await User.findOneAndUpdate(
			{ role: req.params.role },
			{ name: name },
			{ new: true } // Return the updated user data
		);

		if (updatedUser) {
			// If the user is found and updated, send the updated data
			res.json(updatedUser);
		} else {
			// If user is not found, send a 404 error
			res.status(404).json({ message: 'User not found' });
		}
	} catch (err) {
		// Handle any database errors
		res.status(500).json({ message: 'Error updating user' });
	}
});

module.exports = router;
