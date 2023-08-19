const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// To get all users 
router.get('/users', userController.getAllUsers);

// To get user by ID
router.get('/users/:userId', userController.getUserById);

// To create users
router.post('/users', userController.createUser);  

//To update user
router.put('/users/:userId', userController.updateUser);

//To delete user
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;