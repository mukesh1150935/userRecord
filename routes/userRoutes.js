const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyAccessToken=require('../middlewares/verifyToken');


// router.use(verifyAccessToken); 

router.get('/users',verifyAccessToken, userController.getAllUsers);
router.post('/users', userController.createUser);
router.put('/users/:id',verifyAccessToken, userController.updateUser);
router.delete('/users/:id',verifyAccessToken, userController.deleteUser);

module.exports = router;
