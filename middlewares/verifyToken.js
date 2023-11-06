const jwt = require('jsonwebtoken');
const config = require('../config');


function verifyAccessToken(req, res, next) {
    const accessToken = req.header('Authorization');
  
    if (!accessToken) {
      return res.status(401).json({ error: 'Access token is required' });
    }
  
    jwt.verify(accessToken, config.secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid access token' });
      }
      req.user = user; 
      next(); 
    });
  }

  module.exports = verifyAccessToken;