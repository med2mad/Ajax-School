const {sequelizeCon, SequelizeClass} = require('./back/configurations/sequelizeconn');
const Op = SequelizeClass.Op;let result;

const Model1 = sequelizeCon.define('model1', {
        name:{
            type: SequelizeClass.STRING,
            primaryKey:true
            
        },
    },
);
const Model2 = sequelizeCon.define('model2', {
        name:{
            type: SequelizeClass.STRING,
            primaryKey:true
        },
    },
);

Model1.belongsToMany(Model2, {through:'Join'});
Model2.belongsToMany(Model1, {through:'Join'});
// Category.belongsToMany(Game, {through:Join, sourceKey:'name', foreignKey:'game'}); //targetKey:'name',
sequelizeCon.sync({force:true})
.then(()=>{return Model1.bulkCreate([{name:'zelda'},{name:'castlevania'},{name:'tekken'},]);})  
.then(()=>{return Model2.bulkCreate([{name:'3D'},{name:'RPG'},{name:'Windows'},]);})  


.then(()=>{
    return Model1.findByPk('tekken');
})
.then((data)=>{
    console.log( data.hasModel2s('3D'));
    // data.createModel2({name:'new'});
    // return data.countModel2s();
})
.then((data)=>{
    // console.log(data);
})


;
module.exports.sequelizeCon = sequelizeCon;
module.exports.Op = Op;