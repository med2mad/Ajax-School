const {app} = require('./configurations/expressapp');

//API Routes (API endpoints)
const {getAll, add, edit, remove, notFound} = require('./controllers/js/postgresql');
const {getAlls, adds, edits, removes} = require('./controllers/orm/postgresql');
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
