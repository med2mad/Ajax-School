const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User, Op, fn, col} = require('./model');






//subscribe
router.post('/sub', async (req, res, next)=>{
    user.name = req.body.name;
    user.pass = await bcrypt.hash(req.body.pass, 10);
    res.send(user.name + " subscribed with password " + user.pass);
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