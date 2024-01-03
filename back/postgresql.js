const app = require('./configurations/expressapp');

//API Routes (API endpoints)
const {read, add, edit, remove, notFound} = require('./controllers/posgresqlcontroller');
//Get
app.get('/', read);
//Insert
app.post('/', add);
//Update
app.put('/:id', edit);
//Delete
app.delete('/:id', remove);
//404
app.use(notFound);
