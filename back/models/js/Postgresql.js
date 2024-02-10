const con = require('../../configurations/postgresqlconnection');

module.exports = class User {

    static table='users';

    constructor(data) {
        this.name = data.name;
        this.age = data.age;
        this.photo = data.photo;
    }

    static findAll(q, qCount) {
        const rows = new Promise(function(myResolve, myReject) {
            con.query(q, (err, rowsData)=>{
                myResolve(rowsData.rows);
            });
        }); 
        const count = new Promise(function(myResolve, myReject) {
            con.query(qCount, (err, rowCount)=>{
                myResolve(rowCount.rows[0].count);
            });
        }); 
        
        const promises = [];
        promises.push(rows); promises.push(count);
        return Promise.all(promises);
    }

    create() {
        return new Promise((myResolve, myReject)=>{
            con.query("INSERT INTO "+User.table+" (name, age, photo) VALUES ('"+ this.name +"', "+ this.age +", '"+ this.photo +"') RETURNING _id;", (err, data)=>{    
                myResolve({"newId":data.rows[0]._id, "photo":this.photo});
            });
        }); 
    }

    static update(id, body, photo) {
        return new Promise(function(myResolve, myReject) {
            con.query("UPDATE "+User.table+" SET name='"+ body.name +"', age ='"+ body.age +"', photo='"+ photo +"' WHERE _id='"+ id +"'", (err, data)=>{
                myResolve({"photo":photo});
            })
        });
    }
    
    static delete(id, replacement) {
        return new Promise(function(myResolve, myReject) {
            con.query("DELETE FROM "+User.table+" WHERE _id='"+ id +"'", (err, data)=>{
                con.query(replacement, (err, rows)=>{
                    myResolve(rows.rows)
                });
            });
        });
    };
};