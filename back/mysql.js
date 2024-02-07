const app = require('./configurations/expressapp');

//API Routes (API endpoints)
const {getAll, add, edit, remove, notFound, subscribe, getsub} = require('./controllers/js/mysql');
const {getAlls, adds, edits, removes} = require('./controllers/orm/mysql');
//Get
app.get('/', getAll);
//Insert
app.post('/', adds);
//Update
app.put('/:id', edit);
//Delete
app.delete('/:id', remove);
//404
app.use(notFound);