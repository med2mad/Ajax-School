const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000; // You can change this port if needed

// Middleware
app.use(express.json());
app.use(cors());


app.get('/', (req,res) => {
  res.send('00000000');
})

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});