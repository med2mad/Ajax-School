const {sequelizeCon, SequelizeClass} = require('../configurations/sequelizeconn');

const User = sequelizeCon.define('user', {
    _id:{
        type: SequelizeClass.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name:{
        type: SequelizeClass.STRING,
        validate:{ len:{args:[1,25], msg:"name from 1 to 25 chars !"} },
    },
    age:{
        type: SequelizeClass.INTEGER,
        validate:{ min:{args:18, msg:"under aged !"}, max:{args:99, msg:"over aged !"} },
    },
    photo:{
        type: SequelizeClass.STRING,
        defaultValue: '',
    }
});

sequelizeCon.sync({alter:true});
console.log('mysqlSequelize again !');
module.exports.User = User;
module.exports.Op = SequelizeClass.Op;