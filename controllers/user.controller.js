const User = require('../models/User.model');

const userController = {
    // POST api/v1/users/ - Create new user
    createUser: async (req, res) => {
        console.log("Creating user with data:", req.body);

        try {
            const { name, email, number, location } = req.body;

            // Create new user in database
            const newUser = new User({
                name,
                email,
                number,
                location
            });

            const savedUser = await newUser.save();

            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: savedUser
            });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists',
                    error: error.message
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error creating user',
                error: error.message
            });
        }
    },

    // POST api/v1/users/login - User login
    loginUser: async (req, res) => {
        try {
            const { email } = req.body;

            // Find user by email (simple login without password)
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error logging in user',
                error: error.message
            });
        }
    },

    // GET api/v1/users/:userId - Get user by ID
    getUserById: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                message: `User with ID: ${userId} retrieved successfully`,
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving user',
                error: error.message
            });
        }
    },

    // PUT api/v1/users/:userId - Update user by ID
    updateUser: async (req, res) => {
        try {
            const updateData = req.body;
            console.log("Update data received:", updateData);

            const existingUser = await User.findOne({ email: updateData.email });
            console.log("Existing user found:", existingUser);
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            const updatedUser = await User.findByIdAndUpdate(
                existingUser._id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                message: `User ${existingUser._id} updated successfully`,
                data: updatedUser
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error updating user',
                error: error.message
            });
        }
    },

    // DELETE api/v1/users/:userId - Delete user by ID
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;

            const deletedUser = await User.findByIdAndDelete(userId);

            if (!deletedUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                message: `User ${userId} deleted successfully`,
                data: deletedUser
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting user',
                error: error.message
            });
        }
    },

    // POST api/v1/users/logout - User logout
    logoutUser: async (req, res) => {
        try {
            // Simple logout response (no session management)
            res.status(200).json({
                success: true,
                message: 'User logged out successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error logging out user',
                error: error.message
            });
        }
    },

    // GET api/v1/users/location - Get user location
    getUserLocation: async (req, res) => {
        try {
            //   const { userId } = req.params;

            //   if (!userId) {
            //     return res.status(400).json({
            //       success: false,
            //       message: 'User ID is required'
            //     });
            //   }

            let user = await User.find();

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            //   user = user.map(location => {
            //     return location.coordinates
            //   })

            res.status(200).json({
                success: true,
                message: 'User location retrieved successfully',
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving user location',
                error: error.message
            });
        }
    }
};

module.exports = userController;