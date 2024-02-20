const router = require('express').Router();

const { bodyValidation, idValidation, querySanitizer } = require('../configurations/validations');
router.use(querySanitizer());

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

//subscribe
router.post('/sub/:name',  (req, res, next)=>{
    console.log(req.file);
    res.send(req.body);
});

//if app starts with index.js
module.exports = router;

//if app starts with mysql.js
const {app} = require('../configurations/expressapp');
app.use('/mysql', router);