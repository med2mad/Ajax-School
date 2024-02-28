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

//if app starts with index.js
module.exports = router;

//if app starts with routes>mysql.js
const {app} = require('../configurations/expressapp');
app.use('/mysql', router);