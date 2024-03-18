const Sequelize = require('sequelize');
const {app} = require('./expressapp');

// const sequelizeMysql = new Sequelize('test', 'root', '', {
//     dialect:'mysql',
//     host:'localhost',
//     logging: false, //no logs in console
// });

//freesqldatabase.com
const sequelizeMysql = new Sequelize('sql8692210', 'sql8692210', '3vbKb8G5nL', {
    dialect:'mysql',
    host:'sql8.freesqldatabase.com',
    logging: false, //no logs in console
});

sequelizeMysql.authenticate() //test connection before start listening (connection already made without "con")
.then(()=>{
    app.listen(5010, ()=>{console.log("Mysyql: " + 5010);});
})
.catch((err) => {
    console.log('Mysql ORM initial connextion error: ', err);
});

module.exports.sequelizeMysql = sequelizeMysql;
module.exports.SequelizeClass = Sequelize;