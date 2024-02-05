const con = require('../../configurations/mysqlconnection');

module.exports = class User {

    static table='users';

    constructor(data) {
        this.name = data.name;
        this.age = data.age;
        this.photo = data.photo;
    }

    static findAll(q, q2) {
        return new Promise(function(myResolve, myReject) {
            con.query(q2, (err, count)=>{
                con.query(q, (err, rows)=>{
                    myResolve({"rows":rows,"total":count[0].total});
                }); 
            });
        }); 
    }

    create() {
        return new Promise((myResolve, myReject)=>{
            con.query("INSERT INTO "+User.table+" (name, age, photo) VALUES ('"+ this.name +"', "+ this.age +", '"+ this.photo +"')", (err, data)=>{
                myResolve({"newId":data.insertId, "photo":this.photo});
            });
        }); 
    }

    static update(id, body, photo) {
        return new Promise(function(myResolve, myReject) {
            con.query("UPDATE "+User.table+" SET name='"+ body.name +"', age='"+ body.age +"', photo='"+ photo +"' WHERE _id='"+ id +"'", (err, data)=>{
                myResolve({"photo":photo});
            }); 
        });
    }
    
    static delete(id, replacement) {
        return new Promise(function(myResolve, myReject) {
            con.query("DELETE FROM "+User.table+" WHERE _id='"+ id +"'", (err, data)=>{
                con.query(replacement, (err, rows)=>{
                    myResolve(rows)
                });
            });
        });
    };
};