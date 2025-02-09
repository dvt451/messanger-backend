// routes/user.js
const express = require('express');
const router = express.Router();

// Placeholder user data
const users = {
	man: { name: 'John Doe', role: 'man' },
	girl: { name: 'Sona', role: 'girl' }
};

// GET route to fetch user data based on role
router.get('/:role', (req, res) => {
	const role = req.params.role;
	const user = users[role];

	if (user) {
		res.json(user);
	} else {
		res.status(404).json({ message: 'User not found' });
	}
});

// PUT route to update user data (name) based on role
router.put('/:role', (req, res) => {
	const role = req.params.role;
	const { name } = req.body;

	if (users[role]) {
		users[role].name = name; // Update the name of the user based on the role
		res.json(users[role]); // Respond with the updated user data
	} else {
		res.status(404).json({ message: 'User not found' });
	}
});

module.exports = router;