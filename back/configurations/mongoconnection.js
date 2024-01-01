require('dotenv').config();
const port = process.env.mongoosePORT || process.argv[2] || 5020;//get port from 

const app = require('./expressapp');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/medDB', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(port, () => {console.log("Mongoose: " + port);});
  })
  .catch((err) => {
    console.log('Mongoose initial connextion error: ', err);
  });


  
console.log('MongoBDconn again !');
