const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const connectDB = require('./db');
const users = require('./routes/users');
//connect to database
connectDB();
//body parser
app.use(express.json());


app.use('/api', users)
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello world!!')
})
app.listen(port, () => {
    console.log("Application started!");
});