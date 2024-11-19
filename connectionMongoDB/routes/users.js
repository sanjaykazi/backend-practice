const express = require('express');
const router = express.Router();

const User = require('../models/userModel');


// routes
//CRUD Operaitons

// view / read
router.get('/users', async(req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
})

// Update
router.post('/users', async(req, res) => {
    try{
        const {name, age, weight} = req.body;
        const newUser = new User({name, age, weight});
        await newUser.save();
        res.status(200).json({
            success: true,
            user: newUser 
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
})
//update / patch
router.put('/users/:id', async(req, res) => {
    const {id} = req.params;
    const {name, age, weight} = req.body;
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {name, age, weight});
        if(!updatedUser){
            res.json({
                message: "User not found!"
            })
        }
        res.status(200).json({
            success: true,
            user: updatedUser 
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
})
//delete
router.delete('/users/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            res.json({
                message: "User not found!"
            })
        }
        res.status(200).json({
            success: true,
            user: deletedUser 
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
})

module.exports = router;