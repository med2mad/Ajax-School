const con = require('../configurations/mysqlconnection');

module.exports = class User {

    static table='users';

    constructor(data) {
        this.name = data.name;
        this.age = data.age;
        this.photo = data.photo;
    }

    static findAll(q) {
        return new Promise(function(myResolve, myReject) {
            con.query(q, (err, rows)=>{
                myResolve(rows);
            }); 
        }); 
    }

    create(res) {
        con.query("INSERT INTO "+User.table+" (name, age, photo) VALUES ('"+ this.name +"', '"+ this.age +"', '"+ this.photo +"')", (err, data)=>{
            res.json({"newId":data.insertId, "photo":this.photo});
        });
    }

    static update(id, data, res) {
        const p = data.photo;//!!!!!!!!!!!???????????!!!!!!!!!!!!!????????????!!!!!!!!!! (:p)
        con.query("UPDATE "+User.table+" SET name = '"+ data.name +"', age = '"+ data.age +"', photo = '"+ data.photo +"' WHERE _id='"+ id +"'", (err, data)=>{
            res.json({"photo":p}); 
        });
    }
    
    static delete (id, lasttableid, res) {
        con.query("DELETE FROM "+User.table+" WHERE _id='"+ id +"'", (err, data)=>{
            //GET replacement row
            con.query("SELECT * FROM "+User.table+" WHERE _id=(SELECT Max(_id) from "+User.table+" where _id < '"+ lasttableid +"')", (err, rows)=>{
                res.json(rows)
            });
        });
    };
}

console.log('mysqlModel again !');