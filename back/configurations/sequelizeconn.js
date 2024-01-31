const Sequelize = require('sequelize');

module.exports.sequelizeMysql = new Sequelize('test', 'root', '', {
    dialect:'mysql',
    host:'localhost',
    logging: false, //no logs in console
});

module.exports.sequelizeProgresql = new Sequelize('test', 'postgres', '5432', {
    dialect:'postgres',
    host:'localhost',
    logging: false, //no logs in console
});

module.exports.SequelizeClass = Sequelize;