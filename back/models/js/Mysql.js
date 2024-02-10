const con = require('../../configurations/mysqlconnection');

module.exports = class User {

    static table='users';

    constructor(data) {
        this.name = data.name;
        this.age = data.age;
        this.photo = data.photo;
    }

    static findAll(q, qCount) {
        const rows = new Promise(function(myResolve, myReject) {
            con.query(q, (err, rows)=>{
                myResolve(rows);
            }); 
        }); 
        const count = new Promise(function(myResolve, myReject) {
            con.query(qCount, (err, rowCount)=>{
                myResolve(rowCount[0].total);
            });
        }); 

        const promises = [];
        promises.push(rows); promises.push(count);
        return Promise.all(promises);
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