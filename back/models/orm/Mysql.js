const {sequelizeMysql, SequelizeClass} = require('../../configurations/sequelizeconn');

const User = sequelizeMysql.define('user', {
    _id:{
        type: SequelizeClass.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name:{
        type: SequelizeClass.STRING,
        validate:{ len:{args:[1,25], msg:"name from 1 to 25 chars !"} },
        allowNull: false,
    },
    age:{
        type: SequelizeClass.INTEGER,
        validate:{ min:{args:18, msg:"under aged !"}, max:{args:99, msg:"over aged !"} },
        allowNull: false,
    },
    photo:{
        type: SequelizeClass.STRING,
        defaultValue: '',
        allowNull: false,
    }
},
);

module.exports.User = User;
module.exports.Op = SequelizeClass.Op;
module.exports.fn = SequelizeClass.fn;
module.exports.col = SequelizeClass.col;