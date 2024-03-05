const Sequelize = require('sequelize');

const sequelizeAuth = new Sequelize('test', 'root', '', {
    dialect:'mysql',
    host:'localhost',
    logging: false, //no logs in console
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
        validate:{ len:{args:[5,10], msg:"name from 5 to 20 chars !"} },
        allowNull: false,
        unique: true,
    },
    userphoto:{
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false,
    },
    // password:{
    //     type: Sequelize.STRING,
    //     validate:{ len:{args:[5,200], msg:"password from 5 to 20 chars !"} },
    //     allowNull: false,
    // },
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