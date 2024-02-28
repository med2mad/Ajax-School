const router = require('express').Router();
const { bodyValidation, mongooseIdValidation } = require('../configurations/validations');
const mongoSanitize = require('express-mongo-sanitize');
router.use(mongoSanitize());

//controller functions
const {getAll, add, edit, remove} = require('../controllers/orm/mongoose');

//API endpoints
//Get
router.get('/', getAll);
//Insert
router.post('/', bodyValidation(), add);
//Update
router.put('/:id', mongooseIdValidation(), bodyValidation(), edit);
//Delete
router.delete('/:id', mongooseIdValidation(),remove);

//if app starts with index.js
module.exports = router;

//if app starts with routes>mongoose.js
const {app} = require('../configurations/expressapp');
app.use('/mongoose', router);