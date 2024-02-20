const router = require('express').Router();

const { bodyValidation, idValidation, querySanitizer } = require('../configurations/validations');
router.use(querySanitizer());

//controller functions
const {getAll, add, edit, remove} = require('../controllers/orm/postgresql');
// const {getAll, add, edit, remove} = require('../controllers/js/postgresql');

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

//if app starts with postgresql.js
const {app} = require('../configurations/expressapp');
app.use('/postgresql', router);