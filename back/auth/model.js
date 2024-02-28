const Sequelize = require('sequelize');
const {app} = require('../configurations/expressapp');

const sequelizeAuth = new Sequelize('test', 'root', '', {
    dialect:'mysql',
    host:'localhost',
    logging: false, //no logs in console
});

sequelizeAuth.authenticate() //test connection before start listening (connection already made without "con")
.then(()=>{
    app.listen(5040, ()=>{console.log("Auth : " + 5040);});
})
.catch((err) => {
    console.log('Auth ORM initial connextion error: ', err);
});






const User = sequelizeAuth.define('user', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username:{
        type: Sequelize.STRING,
        validate:{ len:{args:[5,10], msg:"name from 5 to 10 chars !"} },
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        validate:{ len:{args:[5,200], msg:"password minimum 5 chars !"} },
        allowNull: false,
    },
    photo:{
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false,
    },
},

);

module.exports.User = User;
module.exports.Op = Sequelize.Op;
module.exports.fn = Sequelize.fn;
module.exports.col = Sequelize.col;
module.exports.SequelizeClass = Sequelize;