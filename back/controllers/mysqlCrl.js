const con = require('../configurations/mysql');
require('dotenv').config();
const table = process.env.DB_table || 'userstable';
const axios = require('axios');

module.exports.getAll = (req, res) => {
    let q ="SELECT * FROM "+table+" WHERE name LIKE '%"+ req.query._name +"%'";
    if (req.query._age) {q += " AND age = '"+ req.query._age +"'";}
    q += " ORDER BY _id DESC LIMIT "+ req.query._limit;
    con.query(q, (err, rows)=>{
        res.json(rows);
    });
};

module.exports.add = (req, res) => {
    con.query("INSERT INTO "+table+" (name, age, photo) VALUES ('"+ req.body.name +"', '"+ req.body.age +"', '"+ req.PHOTO_PARSED +"')", (err, data)=>{
        res.json({"newId":data.insertId, "photo":req.PHOTO_PARSED});
    });
};

module.exports.edit = (req, res) => {
    con.query("UPDATE "+table+" SET name = '"+ req.body.name +"', age = '"+ req.body.age +"', photo = '"+ req.PHOTO_PARSED +"' WHERE _id='"+ req.params.id +"'", (err, data)=>{
        res.json({"photo":req.PHOTO_PARSED});
    });
};

module.exports.remove = (req, res) => {
    con.query("DELETE FROM "+table+" WHERE _id='"+ req.params.id +"'", (err, data)=>{
        //GET replacement row
        con.query("SELECT * FROM "+table+" WHERE _id=(SELECT Max(_id) from "+table+" where _id < '"+ req.query.lasttableid +"')", (err, rows)=>{
            res.json(rows)
        });
    });
};

module.exports.notFound = (req, res) => {
    res.status(404).json("404 , no routes !");
};

module.exports.subscribe = (req, res, next) => {
    console.log(req.file);
    res.send(req.body);
};

module.exports.getsub = (req, res, next) => {
    
};
