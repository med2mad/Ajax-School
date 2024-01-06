// const {sequelize, Datatypes} = require('./configurations/sequelizeconn');

const SequelizeClass = require('sequelize');

const sequelizeCon = new SequelizeClass('test', 'root', '', {
    dialect:'mysql',
    host:'localhost',
    logging: false, //no logs in console
});

const Model1 = sequelizeCon.define('user', {
    _id:{
        type: SequelizeClass.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name:{
        type: SequelizeClass.STRING,
    },
    age:{
        type: SequelizeClass.INTEGER,
    },
    photo:{
        type: SequelizeClass.STRING,
        defaultValue: '',
    }
});
const Model2 = sequelizeCon.define('fuck', {
    _id:{
        type: SequelizeClass.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    price:{type: SequelizeClass.FLOAT},
    sucks:{type: SequelizeClass.BOOLEAN},
  }
);
Model1.hasMany(Model2);

sequelizeCon.sync({alter:true}).then(()=>{
    return Model1.create({name:'aa', age:22, photo:''});
}).then((user)=>{
    // return Model1.findAll({attributes:[[SequelizeClass.fn('COUNT', SequelizeClass.col('age')),'alias'], [SequelizeClass.fn('sum', SequelizeClass.col('_id')),'alias2']]});
    return Model1.findAll({order:['age','name']});

}).then((data)=>{
    console.log(data[0].toJSON());
})


