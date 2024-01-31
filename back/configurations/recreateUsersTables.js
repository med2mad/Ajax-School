const MyUser = require('../models/orm/Mysql').User;
const PoUser = require('../models/orm/Postgesql').User;
const MoUser = require('../models/orm/Mongoose');
const {randFullName, randNumber} = require('@ngneat/falso');
const fs = require('fs');
let name = 'a';

const Models=[MyUser,PoUser];
Models.forEach((Model, index)=>{
    //recreate table in database
    Model.sync({force:true})
    //fill table
    .then(()=>{
        fs.readdir('public/uploads/refill', (err, files)=>{//get uploaded photo names in array
            for (let i=0; i<100; i++){
                do{name = randFullName({withAccents:false});}while(name.lenght<1 || name.lenght>25);
                Model.create({
                    'name': name,
                    'age': randNumber({min:18, max:99, precision:1}),
                    'photo': (0.8-Math.random()>0)? files[randNumber({min:0, max:files.length-1, precision:1})] : '', //put random rohiti but not all the time
                });
            }
        });
    });
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/medDB').then(()=>{
    MoUser.deleteMany().then(()=>{
        fs.readdir('public/uploads/refill', (err, files)=>{//get uploaded photo names in array
            for (let i=0; i<100; i++){
                do{name = randFullName({withAccents:false});}while(name.lenght<1 || name.lenght>25);
                MoUser.create({
                    'name': name,
                    'age': randNumber({min:18, max:99, precision:1}),
                    'photo': (0.8-Math.random()>0)? files[randNumber({min:0, max:files.length-1, precision:1})] : '', //put random rohiti but not all the time
                });
            }
        });
    });
});