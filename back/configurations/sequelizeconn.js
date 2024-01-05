const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'root', '', {
    dialect:'mysql',
    host:'localhost',
    logging: false, //no logs in console
    define:{paranoid:true}//freezeTableName:true, timeStamps:false (instead of in each model)
});


console.log('sequelizeconn again !');
module.exports.sequelize = sequelize;
module.exports.Datatypes = Sequelize.DataTypes;