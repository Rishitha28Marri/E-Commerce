const mongoose = require('mongoose');

const userSchema ={
    userId: { 
        type: String, 
        required: true 
    },    
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}

const User = mongoose.model("User",userSchema);

module.exports = User;