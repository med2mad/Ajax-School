const app = require('./configurations/expressapp');

//API Routes (API endpoints)
const {getAll, add, edit, remove, notFound} = require('./controllers/orm/mongoose');
//Get
app.get('/', getAll);
//Insert
app.post('/', add);
//Update
app.put('/:id', edit);
//Delete
app.delete('/:id', remove);
//404
app.use(notFound);
