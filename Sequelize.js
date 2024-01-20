const {sequelizeCon, SequelizeClass} = require('./back/configurations/sequelizeconn');
const Op = SequelizeClass.Op;

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

module.exports.sequelizeCon = sequelizeCon;
module.exports.Op = Op;