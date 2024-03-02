const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('./model');

//sign up
router.post('/signup', async (req, res,)=>{
    const hash = await bcrypt.hash(req.body.password, 10);
    User.create({"username":req.body.username, "password":req.body.password, "hash":hash, "userphoto":'thumbs up.jpg'})
    .then(()=>{
        res.send("Signed Up !");
    });
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
                const token = jwt.sign({"username":users[0].username, "userphoto":users[0].userphoto}, 'serversecret');
                res.json({"user":users[0], "token":token});
            }
            else{ res.json(false); }
        }
        else{ res.send(false); }
    });
});

//block unauthorized user actions
router.post('*', verifyUser); router.put('*', verifyUser); router.delete('*', verifyUser);

function verifyUser(req, res, next) {
    jwt.verify(req.body.token, 'serversecret', (err, decoded)=>{
        if (err) { res.status(401).send('Action fail (Not Authorized !!)'); }
        else { next() }  
    })
}

module.exports = router;