const router = require('express').Router();
const { bodyValidation, idValidation } = require('../configurations/validations');

//controller functions
const {getAll, add, edit, remove} = require('../controllers/orm/mysql');
// const {getAll, add, edit, remove} = require('../controllers/js/mysql');

//API endpoints
//Get
router.get('/', getAll);
//Insert
router.post('/', bodyValidation(), add);
//Update
router.put('/:id', idValidation(), bodyValidation(), edit);
//Delete
router.delete('/:id', idValidation(), remove);


/////////////////////test//////////////////////////////
const jwt = require('jsonwebtoken');
const {hash, compare} = require('bcrypt');
const user = {name:'null', pass:'null'}

//subscribe
router.post('/sub', async (req, res, next)=>{
    user.name = req.body.name;
    user.pass = await hash(req.body.pass, 10);
    res.send(user.name + " subscribed with password " + user.pass);
});

//login
router.post('/login',  async (req, res, next)=>{
    if (req.body.name !== user.name) { return res.send("wrong name"); }
    const x = await compare(req.body.pass, user.pass);
    if(!x){return res.send("wrong pass");}
    const token = jwt.sign({"name":user.name, "pass":user.pass}, 'secret');
    res.send({"message":'welcome back', "user":user, "token":token});
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
///////////////////////////////////////////////////

//if app starts with index.js
module.exports = router;

//if app starts with routes>mysql.js
const {app} = require('../configurations/expressapp');
app.use('/mysql', router);