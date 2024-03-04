const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('./model');
const dotenv = require('dotenv');
dotenv.config();

//sign up
router.post('/signup', async (req, res,)=>{
    //if username already exists
    const user = await User.findOne({ where: {username:req.body.username} });
    if(user)
        return res.send("exists");
    else{
        const hash = await bcrypt.hash(req.body.password, 10);
        User.create({"username":req.body.username, "password":req.body.password, "hash":hash, "userphoto":req.PHOTO_PARSED})
        .then((user)=>{
            const token = jwt.sign({"id":user.id}, process.env.jwt_secret);
            res.send({"username":req.body.username, "userphoto":req.PHOTO_PARSED, "token":token});
        });
    }
});

//login
router.post('/login', async (req, res)=>{
    User.findAll({
        where: {username:req.body.username},
        raw: true
    })
    .then(async (users)=>{
        if(users.length == 1){
            const match = await bcrypt.compare(req.body.password, users[0].hash)
            if(match){
                const token = jwt.sign({"id":users[0].id}, process.env.jwt_secret);
                res.json({"user":users[0], "token":token});
            }
            else{ res.json(false); }
        }
        else{ res.send(false); }
    });
});


//block unauthorized user actions
router.post('*', verifyUser); router.put('*', verifyUser); //router.delete('*', verifyUser);

function verifyUser(req, res, next) {
    jwt.verify(req.body.token, process.env.jwt_secret, (err, decoded)=>{
        if (err) { res.status(401).send('Action fail (Not Authorized !!)'); }
        else { next() }  
    })
}


module.exports = router;