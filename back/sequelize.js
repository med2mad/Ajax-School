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

let name = null;
sequelizeCon.sync({alter:true}).then(()=>{
    console.log('tables Created');
    return Model1.create({name:'kkk',age:'45',photo:''});
}).then((kkk)=>{
    console.log('user '+kkk._id+' ('+kkk.name+') Created');
    console.log(kkk.toJSON());
    name = kkk.name;
    return kkk.createFuck({price:'16.5'});
}).then((fuck)=>{
    console.log('fuck '+fuck.price+' Created, that belongs to user '+name);
    return Model2.findAll({where:3})//{where:{_id:3}}
}).then((r)=>{
    console.log(JSON.parse(JSON.stringify(r)));
});

      
