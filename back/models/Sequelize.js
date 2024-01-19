const {sequelizeCon, SequelizeClass} = require('../configurations/sequelizeconn');
const Op = SequelizeClass.Op;

// const User = sequelizeCon.define('user', {
//     _id:{
//         type: SequelizeClass.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//     },
//     name:{
//         type: SequelizeClass.STRING,
//         validate:{ len:{args:[1,25], msg:"name from 1 to 25 chars !"} },
//     },
//     age:{
//         type: SequelizeClass.INTEGER,
//         validate:{ min:{args:18, msg:"under aged !"}, max:{args:99, msg:"over aged !"} },
//     },
//     photo:{
//         type: SequelizeClass.STRING,
//         defaultValue: '',
//     }
// },
// );

const Game = sequelizeCon.define('game', {
        name:{
            type: SequelizeClass.STRING,
            unique:true,
        },
    },
);
const Category = sequelizeCon.define('category', {
        name:{
            type: SequelizeClass.STRING,
            unique:true,
        },
    },
);

Game.hasOne(Category);
// Category.belongsToMany(Game, {through:Join, sourceKey:'name', foreignKey:'game'}); //targetKey:'name',

sequelizeCon.sync({force:true})
.then(()=>{
    return Game.bulkCreate([{name:'zelda'},{name:'castlevania'},{name:'tekken'},]);
})  
.then(()=>{
    return Category.bulkCreate([{name:'3D'},{name:'RPG'},{name:'Windows'},]);
})  
.then(()=>{
    return Category.findAll();
})
.then((data)=>{
    categories = data;
    return Game.findOne({where:{name:"zelda"}});
})
.then((data)=>{
    // data.addCategories(categories);
})

;

// console.log('mysqlSequelize again !');
module.exports.sequelizeCon = sequelizeCon;
// module.exports.User = User;
module.exports.Op = Op;