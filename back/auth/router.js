const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('./model');

//sign up
router.post('/signup', async (req, res)=>{
    const hash = await bcrypt.hash(req.body.password, 10);
    User.create({"username":req.body.username, "password":hash, "userphoto":'thumbs up.jpg'})
    .then(()=>{
        res.redirect("/axios");
    });
});

//login
router.post('/login', (req, res)=>{
    User.findAll({
        where: {username:req.body.username, password:req.body.password},
        attributes: ['username', 'userphoto', 'password']
    })
    .then((data)=>{
        res.json(data);
    });
});

//action
router.post( '/action', 
    (req, res, next)=>{
        jwt.verify(req.body.token, 'secret', (err, decoded)=>{
            if(!err){console.log(decoded); next()}else{res.send('action fail');}
        })
    },
    (req, res)=>{res.send('action success');}
);

module.exports = router;