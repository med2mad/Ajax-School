const app = require('./configurations/expressapp');

//API Routes (API endpoints)
const {getAll, add, edit, remove, notFound, subscribe, getsub} = require('./controllers/mysqlcontroller');
const {getAlls, adds, edits, removes} = require('./controllers/mysqlsequelize');
//Get
app.get('/', getAlls);
//Insert
app.post('/', adds);
//Update
app.put('/:id', edits);
//Delete
app.delete('/:id', removes);
//404
app.use(notFound);