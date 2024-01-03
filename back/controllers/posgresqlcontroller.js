const User = require('../models/PostgresqlModel');

module.exports.read = (req, res) => {
    let q ="SELECT * FROM "+User.table+" WHERE name LIKE '%"+ req.query._name +"%'";
    if (req.query._age) {q += " AND age = '"+ req.query._age +"'";}
    q += " ORDER BY _id DESC LIMIT "+ req.query._limit;

    User.findAll(q).then((response)=>{
        res.json(response);
    });
};

module.exports.add = (req, res)=>{
    let user = new User({"name":req.body.name, "age":req.body.age, "photo":req.PHOTO_PARSED});

    user.create().then((response)=>{
        res.json(response);
    });
};

module.exports.edit = (req, res)=>{
    const id = req.params.id;
    const body = {"name":req.body.name, "age":req.body.age};
    const photo = req.PHOTO_PARSED; //by the time con.query finished there will be no more req (no "body")
    
    User.update(id, body, photo).then((response)=>{
        res.json(response); 
    });
};

module.exports.remove = (req, res)=>{
    const id = req.params.id;
    const lasttableid = req.query.lasttableid;
    
    User.delete(id, lasttableid).then((response)=>{
        res.json(response); 
    });
};

module.exports.notFound = (req, res)=>{
    res.status(404).json("404 , no routes !");
};

console.log('postgrescontroller again !');