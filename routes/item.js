const express = require('express')
const router = express.Router()

// define the home page route
router.get('/', (req, res) => {
    res.send("Got a Get Request")
    // res.sendFile('.././dummy.html', {root:__dirname})
});
router.post('/items', (req, res) => {
    // res.send("Got a Post Request")
    res.json({x:1, y:2, z:3})
});
router.put('/items/:id', (req, res) => {
    res.send("Got a Post Request")
});
router.delete('/items/:id', (req, res) => {
    res.send("Got a Delete Request")
});

module.exports = router