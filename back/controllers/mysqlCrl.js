const con = require('../configurations/mysql');

module.exports.getAll = (req, res) => {
    let q ="SELECT * FROM users WHERE name LIKE '%"+ req.query._name +"%'";
    if (req.query._age) {q += " AND age = '"+ req.query._age +"'";}
    q += " ORDER BY id DESC LIMIT "+ req.query._limit;
    con.query(q, (err, rows)=>{
        res.json(rows);
    });
};

module.exports.add = (req, res) => {
    let photoName;
    if(req.file){photoName = req.file.filename;}else{photoName = req.body.selectedPhotoName;}
    con.query("INSERT INTO users (name, age, photo) VALUES ('"+ req.body.name +"', '"+ req.body.age +"', '"+ photoName +"')", (err, data)=>{
        res.json({"id":data.insertId, "photoName":photoName});
    });
};

module.exports.edit = (req, res) => {
    let photoName;
    if(req.file){photoName = req.file.filename;}else{photoName = req.body.selectedPhotoName;}
    con.query("UPDATE users SET name = '"+ req.body.name +"', age = '"+ req.body.age +"', photo = '"+ photoName +"' WHERE id='"+ req.params.id +"'", (err, data)=>{
        res.json({"photoName":photoName});
    });
};

module.exports.remove = (req, res) => {
    con.query("DELETE FROM users WHERE id='"+ req.params.id +"'", (err, data)=>{
        //GET Row to add instead
        con.query("SELECT * FROM users WHERE id=(SELECT Max(id) from users where id < '"+ req.query.lasttableid +"')", (err, rows)=>{
            res.json(rows)
        });
    });
};

module.exports.notFound = (req, res) => {
    res.status(404).json("404 , no routes !");
};

module.exports.addUser = (req, res, next) => {
    const body = req.body;
    const file = req.file;
    console.log(file);
    res.send(body);
};