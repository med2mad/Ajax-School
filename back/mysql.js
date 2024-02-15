const {app} = require('./configurations/expressapp');
const { body, query, param, validationResult } = require('express-validator');

const namevalidation = function () {
    return body('name').trim().escape().isLength({min:1, max:20});
}
const agevalidation = function () {
    return body('age').default('').trim().escape().isInt({min:18, max:99});
}
const idEscape = function () {
    return param('id').default(0).trim().escape();
}
const queryEscape = function () {
    return [query('_name').escape(), query('_age').default(undefined).escape(), query('_skip').default(undefined).escape()];
}

const bodyValidation = [ namevalidation(), agevalidation(), (req, res, next)=>{
    if(validationResult(req).isEmpty()){ next(); }else{ res.send({"errors":validationResult(req).errors}); }
}];

//API endpoints (Routes)
const {getAll, add, edit, remove, notFound, subscribe} = require('./controllers/js/mysql');
const {getAlls, adds, edits, removes} = require('./controllers/orm/mysql');

//Get
app.get('/', queryEscape(), getAll);
//Insert
app.post('/', idEscape(), bodyValidation, add);
//Update
app.put('/:id', idEscape(), bodyValidation, edit);
//Delete
app.delete('/:id', idEscape(), remove);

//test
app.post('/sub/:name', (req, res, next)=>{
    res.send(validationResult(req));
});

//404
app.use(notFound);