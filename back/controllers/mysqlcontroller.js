const User = require('../models/MysqlModel');

module.exports.getAll = (req, res) => {
    let q ="SELECT * FROM "+User.table+" WHERE name LIKE '%"+ req.query._name +"%'";
    if (req.query._age) {q += " AND age = '"+ req.query._age +"'";}
    q += " ORDER BY _id DESC LIMIT "+ req.query._limit;

    User.findAll(q).then((response)=>{
        res.json(response);
    });
};

module.exports.add = (req, res) => {
    const data = {"name":req.body.name, "age":req.body.age, "photo":req.PHOTO_PARSED};
    const o = new User(data);
    o.create(res);
};

module.exports.edit = (req, res) => {
    const data = {"name":req.body.name, "age":req.body.age, "photo":req.PHOTO_PARSED};
    const id = req.params.id;
    User.update(id, data, res);
};

module.exports.remove = (req, res) => {
    const id = req.params.id;
    const lasttableid = req.query.lasttableid;
    User.delete(id, lasttableid, res);
};

module.exports.notFound = (req, res) => {
    res.status(404).json("404 , no routes !");
};

module.exports.subscribe = (req, res, next) => {
    console.log(req.file);
    res.send(req.body);
};

console.log('mysqlController again !');

module.exports.getsub = (req, res, next) => {   };
