
const express = require('express')
const app = express()
const port = 3000
const route = require('./routes/route')
app.use(express.json());

//mounting the routs
app.use('/api', route)
// middleware: loggin, auth, validation
const logginMiddleware = (req,res, next) => {
    console.log('Logging...');
    next();
}
app.use(logginMiddleware);
const authMiddleware = (req, res, next) => {
    console.log('Authenticating...');
    next();
}
app.use(authMiddleware);
const ValidationMiddleware = (req, res, next) => {
    console.log('Validating...');
    res.send('Simon go back!')
    // next();
}
app.use(ValidationMiddleware);

app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Hello World!')
})
app.get('/', (req, res) => {
    console.log(req.body)
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})