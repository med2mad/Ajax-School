const {sequelizeCon, SequelizeClass} = require('../configurations/sequelizeconn');
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
    },
    age:{
        type: SequelizeClass.INTEGER,
        validate:{ min:{args:18, msg:"under aged !"}, max:{args:99, msg:"over aged !"} },
    },
    photo:{
        type: SequelizeClass.STRING,
        defaultValue: '',
    }
},
);

sequelizeCon.sync({alter:true})
.then(()=>{

    sequelizeCon.query(`select * from users`,{model:User})
    .then((data)=>{
        console.log(data[0].toJSON());
    })
})
;

// console.log('mysqlSequelize again !');
module.exports.sequelizeCon = sequelizeCon;
module.exports.User = User;
module.exports.Op = Op;