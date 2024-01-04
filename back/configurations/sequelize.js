const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'root', '', {
    dialect:'mysql',
    host:'localhost',
    logging: false, //not to show logs
    define:{paranoid:true}//freezeTableName:true, timeStamps:false (instead of in each model)
});

const Model1 = sequelize.define('user', {//'user' = model name single form = table name in plural form
    _id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name:{
        type: Sequelize.STRING,
    },
    age:{
        type: Sequelize.INTEGER,
    },
    photo:{
        type: Sequelize.STRING,
        defaultValue: '',
    }
});
const Model2 = sequelize.define('fuck', {//model name single form = table name in plural form
    _id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    price:{type: Sequelize.FLOAT},
  }//,{paranoid:true, tableName:'t-users', freezeTableName:true, timeStamps:false}
);
Model1.hasMany(Model2);

let name = null;

//Model1.sync(); //Model1.drop(); //sequelize.drop({match: /_test$/})
//sequelize now contains sequelize.modules.user(Model1) and sequelize.modules.fuck(Model2) 
sequelize.sync({alter:true}).then(()=>{ //{alter:true, force:true} (ALTER TABLE (keeps data) / DROP TABLE)
    console.log('tables Created');
    return Model1.create({name:'kkk',age:'45',photo:''});
}).then((kkk)=>{
    console.log('user '+kkk._id+' ('+kkk.name+') Created');
    name = kkk.name;
    return kkk.createFuck({price:'16.5'});
}).then((fuck)=>{
    console.log('fuck '+fuck.price+' Created, that belongs to user '+name);
    return Model2.findAll({where:1})
}).then((r)=>{
    console.log(JSON.stringify(r));
});

      





console.log('sequelizeconn again !');
module.exports = sequelize;