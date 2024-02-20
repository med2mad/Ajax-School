const Sequelize = require('sequelize');
const {app} = require('./expressapp');

const sequelizePostgresql = new Sequelize('test', 'postgres', '5432', {
    dialect:'postgres',
    host:'localhost',
    logging: false, //no logs in console
});

sequelizePostgresql.authenticate() //test if connection works to start listening
.then(()=>{
    app.listen(5030, ()=>{console.log("Postgresql: " + 5030);});
})
.catch((err) => {
    console.log('Postgresql ORM initial connextion error: ', err);
});

module.exports.sequelizePostgresql = sequelizePostgresql;
module.exports.SequelizeClass = Sequelize;