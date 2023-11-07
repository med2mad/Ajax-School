const mysqlCrl = require('./controllers/mysqlCrl');

module.exports = class User{
    constructor (nameP, ageP, photoP){
        this.name = nameP;
        this.age = ageP;
        this.photoP = photoP;
    }

    save(){
        mysqlCrl.add(this);
    }

    static getAll(){
        
    }
}