const Sequelize = require('sequelize');
const {app} = require('./expressapp');

// const sequelizePostgresql = new Sequelize('test', 'postgres', '5432', {
//     dialect:'postgres',
//     host:'localhost',
//     logging: false, //no logs in console
// });

//elephantsql.com
const sequelizePostgresql = new Sequelize(
    'postgres://vwvnxbct:XNLTn1mvFz6q4vf0IS5c9iXoSALqn68q@surus.db.elephantsql.com/vwvnxbct',
    {logging: false}
);

// //vercel.com
// const sequelizePostgresql = new Sequelize(
//     'postgres://default:R4bGpkZPsME3@ep-rapid-tree-a41dnde4-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
//     {logging: false}
// );

sequelizePostgresql.authenticate() //test connection before start listening (connection already made without the "client" object)
.then(()=>{
    app.listen(5030, ()=>{console.log("Postgresql: " + 5030);});
})
.catch((err) => {
    console.log('Postgresql ORM initial connextion error: ', err);
});

module.exports.sequelizePostgresql = sequelizePostgresql;
module.exports.SequelizeClass = Sequelize;