const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // If needed for cross-origin requests
const userRoutes = require('./routes/user');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

// Set up HTTP server and Socket.io
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB connection
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.log('Error connecting to MongoDB:', err));

// Register routes
app.use('/user', userRoutes);

// Socket.io communication
io.on('connection', (socket) => {
	console.log('A user connected');

	// Handle message event
	socket.on('sendMessage', (data) => {
		io.emit('message', { user: data.user.name, message: data.message });
	});

	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
});

// Start server
server.listen(5000, () => {
	console.log('Server is running on port 5000');
});
