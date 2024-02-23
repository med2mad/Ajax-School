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
const {hashSync} = require('bcrypt');

//subscribe
router.post('/sub', (req, res, next)=>{
    const token = jwt.sign('entry_id', 'secret');
    const hashedPass = hashSync(req.body.age, 10);
    res.send(req.body.name + " subscribed with password " + req.body.age + "("+ hashedPass +")");
});

//login
router.post('/login',  (req, res, next)=>{
    console.log("not Authorized !");
    res.status(401).redirect("/login");
});

///////////////////////////////////////////////////

//if app starts with index.js
module.exports = router;

//if app starts with routes>mysql.js
const {app} = require('../configurations/expressapp');
app.use('/mysql', router);