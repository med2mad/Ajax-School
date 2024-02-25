const {app} = require('./configurations/expressapp');


/////////////////////mysql 5010///////////////////////
const mysqlRouter = require('./routes/mysql');
app.use('/mysql', mysqlRouter);

///////////////////mongoose 5020//////////////////////
const mongooseRouter = require('./routes/mongoose');
app.use('/mongoose', mongooseRouter);

//////////////////postgresql 5030/////////////////////
const postgresqlRouter = require('./routes/postgresql');
app.use('/postgresql', postgresqlRouter);

////////////////////404/////////////////////////
app.use((req, res)=>{
    res.status(404).json("404 , no routes !");
});



//subscribe
app.post('/sub/:name', (req, res, next)=>{
    res.send(validationResult(req));
});