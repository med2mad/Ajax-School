const {app} = require('./configurations/expressapp');
const { body, query, param, validationResult } = require('express-validator');

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

//API endpoints (Routes)
const {getAll, add, edit, remove, notFound, subscribe} = require('./controllers/js/mysql');
const {getAlls, adds, edits, removes} = require('./controllers/orm/mysql');

//Get
app.get('/', getAlls);
//Insert
app.post('/', bodyValidation, adds);
//Update
app.put('/:id', idValidation(), bodyValidation, edits);
//Delete
app.delete('/:id', idValidation(), removes);

//test
app.post('/sub/:name', (req, res, next)=>{
    res.send(validationResult(req));
});

//404
app.use(notFound);