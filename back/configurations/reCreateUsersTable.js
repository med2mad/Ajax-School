const MUser = require('../models/sequelize/Mysql').User;
const PUser = require('../models/sequelize/Postgesql').User;
const {randFullName, randNumber} = require('@ngneat/falso');
const fs = require('fs');

const Models=[MUser,PUser];

Models.forEach((Model, i)=>{
    //recreate table in database
    Model.sync({force:true})
    //fill table
    .then(()=>{
        fs.readdir('public/uploads/refill', (err, files)=>{//get uploaded photo names in array
            files=files.sort(()=>(0.5-Math.random())*randNumber({min:1,max:300,precision:1}));//shuffle photos (sorted by name) 
            for (let i=0; i<files.length; i++){
                let name = 'a';
                while(name=='a' || name.lenght>25){name = randFullName({withAccents:false});}
                Model.create({
                    'name': name,
                    'age': randNumber({min:18, max:99, precision:1}),
                    'photo': (0.8-Math.random()>0)? files[i] : '', //not to put photos all the time
                });
            }
        })
    });
});