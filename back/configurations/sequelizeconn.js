const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'root', '', {
    dialect:'mysql',
    host:'localhost',
    logging: false, //no logs in console
});

// console.log('sequelizeconn again !');
module.exports.sequelizeCon = sequelize;
module.exports.SequelizeClass = Sequelize;
