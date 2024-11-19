const express = require('express');
const { route } = require('../../routes/item');
const router = express.Router();

//middlewares
const auth = (req, res , next) => {
    console.log('Authenticating...')
    // adding dummy user
    req.user = {userId: 1, role:"admin"}
    if(req.user) {
        next();
    }else{
        res.json({
            success: false,
            message: "Not a valid user",
        })
    }
}
const isStudent = (req, res, next) => {
    console.log("inside student middleware");
    if(req.user.role === "student"){
        next();
    }else{
        res.json({
            success: false,
            message: "Access Denied, This route is only for students"
        })
    }
}
const isAdmin = (req, res, next) => {
    console.log("inside student middleware");
    if(req.user.role === "admin"){
        next();
    }else{
        res.json({
            success: false,
            message: "Access Denied, This route is only for admins"
        })
    }
}

//routes
router.get('/student', auth, isStudent, (req, res) => {
    console.log("I am inside student route")
    res.send("Student specific page")
})
router.get('/admin', auth, isAdmin, (req, res) => {
    console.log("I am inside admin route")
    res.send("Admin specific page")
})

module.exports = router