const express = require('express');
const User = require('../models/user');  // Import User model
const router = express.Router();

// GET route to fetch user data based on role
router.get('/:role', async (req, res) => {
	try {
		const user = await User.findOne({ role: req.params.role });

		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (err) {
		res.status(500).json({ message: 'Error retrieving user' });
	}
});

// PUT route to update user data (name) based on role
router.put('/:role', async (req, res) => {
	try {
		const { name } = req.body;
		const updatedUser = await User.findOneAndUpdate(
			{ role: req.params.role },
			{ name: name },
			{ new: true } // Return the updated user
		);

		if (updatedUser) {
			res.json(updatedUser);
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (err) {
		res.status(500).json({ message: 'Error updating user' });
	}
});

module.exports = router;
