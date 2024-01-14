const {User, Op} = require('../models/Sequelize');

module.exports.getAlls = (req, res)=>{
    const whereClause = {};
    whereClause.name = {[Op.like] : '%'+req.query._name+'%'};
    if (req.query._age) {whereClause['age'] = req.query._age;}
    const _limit = parseInt(req.query._limit);
    
    User.findAll({
        where: whereClause,
        limit: _limit,
    })
    .then((entries)=>{
        res.json(entries);
    });
};

module.exports.adds = (req, res)=>{
    User.create({"name":req.body.name, "age":req.body.age, "photo":req.PHOTO_PARSED})
    .then((entry)=>{
        res.json({"newId":entry._id, "photo":req.PHOTO_PARSED});
    });
};

module.exports.edits = (req, res)=>{
    const photo = req.PHOTO_PARSED;

    User.update({"name":req.body.name, "age":req.body.age, "photo":photo}, {where:{_id: req.params.id}})
    .then(()=>{
        res.json({"photo":photo});
    });
};

module.exports.remove = (req, res)=>{

};

module.exports.notFound = (req, res)=>{
    res.status(404).json("404 , no routes !");
};

console.log('mysql sequelize Controller again !');