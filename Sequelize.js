const {sequelizeCon, SequelizeClass} = require('./back/configurations/sequelizeconn');
const {randAvatar, randFullName, randNumber} = require('@ngneat/falso');
const Op = SequelizeClass.Op;

const User = sequelizeCon.define('user', {
    _id:{
        type: SequelizeClass.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name:{
        type: SequelizeClass.STRING,
        validate:{ len:{args:[1,25], msg:"name from 1 to 25 chars !"} },
        allowNull: false,
    },
    age:{
        type: SequelizeClass.INTEGER,
        validate:{ min:{args:18, msg:"under aged !"}, max:{args:99, msg:"over aged !"} },
        allowNull: false,
    },
    photo:{
        type: SequelizeClass.STRING,
        defaultValue: '',
    }
},
);

User.sync({force:true})

.then(()=>{
    for (let i=0; i<100; i++){
        User.create({
            'name': randFullName({withAccents:false}),
            'age': randNumber({min:18, max:99, precision:1}),
            'photo': randAvatar()+'?img='+Math.random(),
        });
    }
})



;
module.exports.sequelizeCon = sequelizeCon;
module.exports.Op = Op;