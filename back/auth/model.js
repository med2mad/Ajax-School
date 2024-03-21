const Sequelize = require('sequelize');
const {sequelizeMysql} = require('../configurations/mysqlSequelizecon');

// const sequelizeMysql = new Sequelize('test', 'root', '', {
//     dialect:'mysql',
//     host:'localhost',
//     logging: false, //no logs in console
// });

const User = sequelizeMysql.define('user', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username:{
        type: Sequelize.STRING,
        validate:{ len:{args:[5,10], msg:"name from 5 to 20 chars !"} },
        allowNull: false,
        unique: true,
    },
    userphoto:{
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false,
    },
    hash:{
        type: Sequelize.STRING,
        allowNull: false,
    },
},
{
    createdAt:false,
    updatedAt:false
}
);

module.exports.User = User;
module.exports.Op = Sequelize.Op;