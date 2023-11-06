const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { generateAccessToken, generateRefreshToken } = require('../utils/authUtils');

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    
    const accessToken = jwt.sign({ id: user._id, username: user.username }, config.secretKey, {
      expiresIn: config.accessTokenExpiration
    });
    const refreshToken = jwt.sign({ id: user._id, username: user.username }, config.secretKey, {
      expiresIn: config.refreshTokenExpiration
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function refreshToken(req, res) {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is required' });
  }

  try {
    jwt.verify(refreshToken, config.secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid refresh token' });
      }

      // new access token
      const accessToken = jwt.sign({ id: user.id, username: user.username }, config.secretKey, {
        expiresIn: config.accessTokenExpiration
      });

      res.json({ accessToken });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { login, refreshToken };
