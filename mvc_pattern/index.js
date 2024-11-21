const express = require('express')
const app = express()
const port = 3000
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes')
const cors = require('cors');

// Enable CORS for all origins (or specify the origin URL for security purposes)
app.use(cors());

//connect to db
connectDB();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api', productRoutes)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})