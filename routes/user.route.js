const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

// POST api/v1/users/ - Create new user
router.post('/', userController.createUser);

// POST api/v1/users/login - User login
router.post('/login', userController.loginUser);

// GET api/v1/users/location - Get user location (this should come before /:userId to avoid conflicts)
router.get('/location/', userController.getUserLocation);

// POST api/v1/users/logout - User logout
router.post('/logout', userController.logoutUser);

// GET api/v1/users/:userId - Get user by ID
router.get('/:userId', userController.getUserById);

// PUT api/v1/users/:userId - Update user by ID
router.put('/', userController.updateUser);

// DELETE api/v1/users/:userId - Delete user by ID
router.delete('/:userId', userController.deleteUser);

module.exports = router;
