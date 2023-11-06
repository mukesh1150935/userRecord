const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    },
  phone: {
    type: String,
    minLength: 1,
    maxLength: 10
  },
  position:{
    type: String,
    enum: ['Manager', 'Developer', 'Designer', 'Tester'],
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
