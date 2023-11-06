const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../utils/authUtils');

async function getAllUsers(req, res) {
  try {
    const users = await User.find({}, '-password'); 
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createUser(req, res) {
  const { username, password, name, phone, position } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

  
    const hashedPassword = bcrypt.hashSync(password, 10);

    
    const user = new User({
      username,
      password: hashedPassword,
      name,
      phone,
      position
    });

    await user.save();
    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const { name, phone, position } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone, position },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
