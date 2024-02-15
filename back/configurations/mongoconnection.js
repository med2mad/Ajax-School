const {app} = require('./expressapp');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/medDB', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  app.listen(5020, () => {console.log("Mongoose: " + 5020);});
})
.catch((err) => {
  console.log('Mongoose initial connextion error: ', err);
});