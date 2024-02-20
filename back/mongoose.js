const {app} = require('./configurations/expressapp');
const { body, query, param, validationResult } = require('express-validator');
const mongoSanitize = require('express-mongo-sanitize');

app.use(mongoSanitize());

const namevalidation = function () {
    return body('name').trim().isLength({min:1, max:30});
}
const agevalidation = function () {
    return body('age').trim().default('').isInt({min:18, max:99});
}
const idValidation = function () {
    return param('id').trim().isInt();
}
const queryEscape = function () {
    return [query('_name').trim().default('').escape(), query('_age').default(undefined), query('_skip').default(undefined)];
}

const bodyValidation = [ namevalidation(), agevalidation(), (req, res, next)=>{
    if(validationResult(req).isEmpty()){ next(); }else{ res.send({"errors":validationResult(req).errors}); }
}];

//API Routes (API endpoints)
const {getAll, add, edit, remove} = require('./controllers/orm/mongoose');
//Get
app.get('/mongoose', getAll);
//Insert
app.post('/mongoose', add);
//Update
app.put('/mongoose/:id', edit);
//Delete
app.delete('/mongoose/:id', remove);
//404
app.use((req, res)=>{
    res.status(404).json("404 , no routes !");
});