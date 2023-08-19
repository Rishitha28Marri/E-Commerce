
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const userController = {

    // Get all users
    getAllUsers: async(req,res) => {
        try{
            const users = await User.find();
            res.json({users});
        }catch(err){
            console.log(err);
            res.status(500).json({message: "Server Error"})
        }
    },

    getUserById: async (req, res) => {
        try {
          const { userId } = req.params;
          const user = await User.findById(userId);
          const token = jwt.sign({ userId: user._id }, 'your-secret-key');
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.json({user,token});
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Server error' });
        }
      },

    // Create a new user
    createUser: async(req,res) => {
        try{
            const user = new User(req.body);
            console.log(req.body)
            await user.save();
            
            const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

            res.status(201).json({user,token});
        }catch(err){
            res.status(500).json({message: err.message});
        }
    },

    // Update a user by ID
    updateUser: async(req,res) => {
        try{
            const{ userId } = req.params;
            const updatedUser = await User.findByIdAndUpdate(userID, req.body, { new:true});
            res.json(updateUser);
            const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
        }catch(err){
            console.log(err);
            res.status(500).json({message: "Server Error"});
        }
    },

    // Delete a user by ID
    deleteUser: async(req,res) => {
        try{
            const{ userId } = req.params;
            await User.findByIdAndDelete(userId);
            res.json({message: 'User deleted successfully'});
        }catch(err){
            console.log(err);
            res.status(500).json({message: "Server Error"});
        }
    }
};

module.exports = userController;