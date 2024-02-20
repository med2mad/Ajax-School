const {app} = require('./configurations/expressapp');


/////////////////////mysql///////////////////////
const mysqlRouter = require('./routes/mysql');
app.use('/mysql', mysqlRouter);

///////////////////mongoose//////////////////////
const mongooseRouter = require('./routes/mongoose');
app.use('/mongoose', mongooseRouter);

//////////////////postgresql/////////////////////
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