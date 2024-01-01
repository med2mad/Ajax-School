require('./configurations/mongoconnection');
const usersModel = require('./models/MongoModel');

const app = require('./configurations/expressapp');
//API Routes (API endpoints) 
//Get All
app.get('/', async (req, res) => {
  if(req.query._limit==0){res.json([]);}
  else{
    let q = {"name":{ $regex: '.*' + req.query._name + '.*' }};
    if (req.query._age) {q.age = req.query._age;}
      usersModel.find(q).sort({"_id":-1}).select("-__v -timestamp").limit(req.query._limit).then((data)=>{
      res.json(data);
    });
  }
});

//Insert
app.post('/', (req, res) => {
  req.body.photo = req.PHOTO_PARSED; //see schema

  const row = new usersModel(req.body);
  row.save().then((data)=>{
    res.json({"newId":data._id, "photo":req.PHOTO_PARSED});
  });
});
//Update
app.put('/:id', (req, res) => {
  usersModel.findById(req.params.id).then((row)=>{
    row.name=req.body.name;
    row.age=req.body.age;
    row.photo=req.PHOTO_PARSED;
    row.save().then((data)=>{
      res.json({"photo":req.PHOTO_PARSED})
    });
  });
});
//Delete
app.delete('/:id', (req, res) => {
  usersModel.findOneAndDelete({"_id":req.params.id}).then((data)=>{
    //GET replacement row
    usersModel.find({"_id":{$lt:req.query.lasttableid}}).sort({"_id":-1}).select("-__v -timestamp").limit(1).then((data)=>{
      res.json(data);
    });
  });
});
//404
app.use((req, res) => {
  res.status(404).json("404 , no routes !")
});
