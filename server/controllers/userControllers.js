//Example of a user controller

const User = require('../models/user');

// Controller function for retrieving a user
const getUser = async (req, res) => {
  try {
    // Retrieve the user from the database
    const user = await User.findById(req.params.userId);

    // Return the user as the response
    res.json(user);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

// Controller function for creating a new user
const createUser = async (req, res) => {
  try {
    // Create a new user based on the request body
    const newUser = await User.create(req.body);

    // Return the created user as the response
    res.status(201).json(newUser);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Export the controller functions
module.exports = {
  getUser,
  createUser,
};

// const express = require('express');
// const User = require('./models/User');

// const router = express.Router();

// router.get('/', async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// router.post('/', async (req, res) => {
//   const user = new User({
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password
//   });

//   await user.save();

//   res.json(user);
// });


module.exports = router;