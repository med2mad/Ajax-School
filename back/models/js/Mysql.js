const con = require('../../configurations/mysqlconnection');

module.exports = class Profile {

    static table='profiles';
    
    constructor(data) {
        this.name = data.name;
        this.age = data.age;
        this.photo = data.photo;
    }

    static findAll(q, t, qCount, tCount) {
        return new Promise(function(myResolve, myReject) {
            con.query(qCount, tCount, (err, countData)=>{
                con.query(q, t, (err, rows)=>{
                    myResolve({"rows":rows,"total":countData[0].total});
                }); 
            });
        }); 
    }

    create() {
        return new Promise((myResolve, myReject)=>{
            con.query("INSERT INTO "+Profile.table+" (name, age, photo) VALUES (?, ?, ?)", [this.name, this.age, this.photo] , (err, data)=>{
                myResolve({"newId":data.insertId, "photo":this.photo});
            });
        }); 
    }

    static update(id, body, photo) {
        return new Promise(function(myResolve, myReject) {
            con.query("UPDATE "+Profile.table+" SET name=?, age=?, photo=? WHERE _id=?", [body.name, body.age, photo, id], (err, data)=>{
                myResolve({"photo":photo});
            }); 
        });
    }
    
    static delete(id, replacement) {
        return new Promise(function(myResolve, myReject) {
            con.query("DELETE FROM "+Profile.table+" WHERE _id=?", [id], (err, data)=>{
                con.query(replacement, (err, rows)=>{
                    myResolve(rows)
                });
            });
        });
    };
};