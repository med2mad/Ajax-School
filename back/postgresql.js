const {app} = require('./configurations/expressapp');

//API Routes (API endpoints)
// const {getAll, add, edit, remove} = require('./controllers/js/postgresql');
const {getAll, add, edit, remove} = require('./controllers/orm/postgresql');
//Get
app.get('/postgresql', getAll);
//Insert
app.post('/postgresql', add);
//Update
app.put('/postgresql/:id', edit);
//Delete
app.delete('/postgresql/:id', remove);
