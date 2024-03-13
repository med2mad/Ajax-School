const {app} = require('./expressapp');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
// mongoose.connect('mongodb+srv://med:allahommairhamna@cluster0.7zp3rzt.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true})

.then(() => { //if connection works to start listening
  app.listen(5020, () => {console.log("Mongoose: " + 5020);});
})
.catch((err) => {
  console.log('Mongoose initial connextion error: ', err);
});