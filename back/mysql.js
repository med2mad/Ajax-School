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

//API endpoints (Routes)
// const {getAll, add, edit, remove} = require('./controllers/js/mysql');
const {getAll, add, edit, remove} = require('./controllers/orm/mysql'); //will not work without JS / add router(for 1 index.js) / 

//Get
app.get('/mysql', getAll);
//Insert
app.post('/mysql', bodyValidation, add);
//Update
app.put('/mysql/:id', idValidation(), bodyValidation, edit);
//Delete
app.delete('/mysql/:id', idValidation(), remove);
//404
app.use((req, res)=>{
    res.status(404).json("404 , no routes !");
});

//subscribe
app.post('/sub/:name', (req, res, next)=>{
    res.send(validationResult(req));
});