const usersModel = require('../models/MongoModel');
require('../configurations/mongoconnection');

module.exports.getAll = (req, res)=>{
    if(req.query._limit==0){res.json([]);}
    else{
      let q = {"name":{ $regex: '.*' + req.query._name + '.*' }};
      if (req.query._age) {q.age = req.query._age;}
        usersModel.find(q).sort({"_id":-1}).select("-__v -timestamp").limit(req.query._limit).then((data)=>{
        res.json(data);
      });
    }
};

module.exports.add = (req, res)=>{
    const photo = req.PHOTO_PARSED; //by the time save() finishes there will be no more req (no "body")

    const row = new usersModel(req.body);
    row.save().then((data)=>{
        res.json({"newId":data._id, "photo":photo});
    });
};

module.exports.edit = (req, res)=>{
    usersModel.findById(req.params.id).then((row)=>{
        row.name=req.body.name;
        row.age=req.body.age;
        row.photo=req.PHOTO_PARSED;
        row.save().then((data)=>{
            res.json({"photo":req.PHOTO_PARSED})
        });
    });
};

module.exports.remove = (req, res)=>{
    usersModel.findOneAndDelete({"_id":req.params.id}).then((data)=>{
        //GET replacement row
        usersModel.find({"_id":{$lt:req.query.lasttableid}}).sort({"_id":-1}).select("-__v -timestamp").limit(1).then((data)=>{
            res.json(data);
        });
    });
};

module.exports.notFound = (req, res)=>{
    res.status(404).json("404 , no routes !");
};

console.log('mongodbcontroller again !');