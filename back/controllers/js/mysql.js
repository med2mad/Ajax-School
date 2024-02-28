const Profile = require('../../models/js/Mysql');

module.exports.
getAll = (req, res)=>{
    let q ="SELECT * FROM "+Profile.table+" WHERE name LIKE concat('%', ?, '%')"; const t = [req.query._name];
        if (req.query._age) {q += " AND age = ?"; t.push(req.query._age);}
        q += " ORDER BY _id DESC LIMIT "+ req.query._limit +" OFFSET " + req.query._skip;

    let qCount ="SELECT count(_id) as total FROM "+Profile.table+" WHERE name LIKE concat('%', ?, '%')"; const tCount = [req.query._name];
        if (req.query._age) {qCount += " AND age = ?"; tCount.push(req.query._age);}

        Profile.findAll(q, t, qCount, tCount).then((response)=>{
        res.json(response);
    });
};

module.exports.
add = (req, res)=>{
    const profile = new Profile({"name":req.body.name, "age":req.body.age, "photo":req.PHOTO_PARSED});

    profile.create().then((response)=>{
        res.json(response);
    });
};

module.exports.
edit = (req, res)=>{
    const id = req.params.id;
    const body = {"name":req.body.name, "age":req.body.age};
    const photo = req.PHOTO_PARSED; //by the time con.query finishes there will be no more req (no "body")
    
    Profile.update(id, body, photo).then((response)=>{
        res.json(response); 
    });
};

module.exports.
remove = (req, res)=>{
    let replacement = "SELECT * FROM "+Profile.table+" WHERE _id=";
        replacement += "(SELECT Max(_id) from "+Profile.table+" where _id < '"+ req.query.lasttableid +"' AND name LIKE '%"+ req.query._name +"%'";
        if (req.query._age) {replacement += " AND age = '"+ req.query._age +"'";}
        replacement += ")";

    Profile.delete(req.params.id, replacement).then((response)=>{
        res.json(response); 
    });
};