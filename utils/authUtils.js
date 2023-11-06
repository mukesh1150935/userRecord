const jwt = require('jsonwebtoken');
const config = require('../config');

function generateAccessToken(user) {
  return jwt.sign(user, config.secretKey, { expiresIn: config.accessTokenExpiration });
}

function generateRefreshToken(user) {
  return jwt.sign(user, config.secretKey, { expiresIn: config.refreshTokenExpiration });
}

module.exports = { generateAccessToken, generateRefreshToken };
