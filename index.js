const express = require('express')
const corse =  require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Online ticket server in running')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
