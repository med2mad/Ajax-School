const {User} = require('../../models/orm/Mongoose');
require('../../configurations/mongoconnection');

module.exports.getAll = async (req, res)=>{
    const count = await User.countDocuments().exec();

    if(req.query._limit==0){res.json({"rows":[],"count":count});}
    else{
        const q = {name:{ $regex: '.*' + req.query._name + '.*' }};
        if (req.query._age) {q.age = req.query._age;}
        User.find(q).sort({_id:-1}).select("-__v -timestamp").limit(req.query._limit).then((data)=>{
            res.json({"rows":data,"total":count});
        });
    }
};

module.exports.add = (req, res)=>{
    const photo = req.PHOTO_PARSED; //by the time save() finishes there will be no more "req.body"

    const row = new User(req.body);
    row.save().then((data)=>{
        res.json({"newId":data._id, "photo":photo});
    });
};

module.exports.edit = (req, res)=>{
    User.findById(req.params.id).then((row)=>{
        row.name=req.body.name;
        row.age=req.body.age;
        row.photo=req.PHOTO_PARSED;

        row.save().then((data)=>{
            res.json({"photo":req.PHOTO_PARSED})
        });
    });
};

module.exports.remove = (req, res)=>{
    User.findOneAndDelete({"_id":req.params.id}).then((data)=>{
        //GET replacement row
        const q = {_id: {$lt: req.query.lasttableid}};
        q.name = {$regex: '.*' + req.query._name + '.*'};
        if (req.query._age) {q.age = req.query._age;}
        
        User.find(q).sort({"_id":-1}).select("-__v -timestamp").limit(1).then((data)=>{
            res.json(data);
        });
    });
};

module.exports.notFound = (req, res)=>{
    res.status(404).json("404 , no routes !");
};