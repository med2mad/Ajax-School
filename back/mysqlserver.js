const app = require('./configurations/expressapp');

//API Routes (API endpoints)
const {getAll, add, edit, remove, notFound, subscribe, getsub} = require('./controllers/mysqlcontroller');
//Get
app.get('/sub', getsub);
app.get('/', getAll);
//Insert
app.post('/sub', subscribe);
app.post('/', add);
//Update
app.put('/:id', edit);
//Delete
app.delete('/:id', remove);
//404
app.use(notFound);