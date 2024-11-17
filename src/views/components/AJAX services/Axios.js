import axios from 'axios';
import Swal from 'sweetalert2';
import { paginate } from '../utils';

async function fget(uri, store, limit, currentpage, back){
  await axios.get('http://localhost:5000/table_name?table_name=profiles_'+localStorage.getItem('username'))

  const response = await axios.get(uri)
  store.rows = response.data.rows;
  store.pagination = paginate(response.data.total, currentpage, limit, 10);

  codemirror(response.data.rawSQL, saveSnippet('', back, uri, store, 'GET', 'Read'));
}

async function fpost(uri, body, store, limit, back){
  try {
    const response = await axios.post(uri,body);
    store.nameError=false; store.ageError=false;
    if(response.data.errors){
      response.data.errors.forEach(error => { if(error.path=='name'){store.nameError=true}else{store.ageError=true} });
    }
    else{
      const rowToInsert = {"_id":response.data.newId, "photo":response.data.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get
      store.rows.unshift(rowToInsert);
      if(store.rows.length>limit){store.rows.pop();}//remove last row in <table> (respect limit after add)
      codemirror(response.data.rawSQL, saveSnippet('response.data.newId', back, uri, store, 'POST', 'Create'));
    }
  } catch (error) {
    if(error.response && error.response.status == 401){
      Swal.fire('Login again please.');
    }
  }
}

async function fput(method, uri, body, selectedTr, store, back){
  try {
    const response = await axios({"method":method, "url":uri, "data":body}, {"headers": {"Content-Type":'multipart/form-data'}})
    store.nameError=false; store.ageError=false;
    if(response.data.errors){
      response.data.errors.forEach(error => { if(error.path=='name'){store.nameError=true}else{store.ageError=true} });
    }
    else{
      store.rows[selectedTr].name=body.get('name'); store.rows[selectedTr].age=body.get('age'); store.rows[selectedTr].photo=response.data.photo;
      codemirror(response.data.rawSQL, saveSnippet('response.data.editedId', back, uri, store, method, 'Update'));
    }
  } catch (error) {
    if(error.response && error.response.status == 401){
      Swal.fire('Login again please.');
    }
  }
}

async function fdelete(method, uri, store, back){
  const response = await axios({"method":method, "url":uri})
  codemirror(response.data.rawSQL, saveSnippet('response.data.deletedId', back, uri, store, method, 'Delete'));

  //GET replacement row
  if(response.data.rows.length>0)
  { store.rows.push({"_id":response.data.rows[0]._id, "name":response.data.rows[0].name, "age":response.data.rows[0].age, "photo":response.data.rows[0].photo}) }
}



function saveSnippet(_id, back, uri, store, method, action, currentpage){
  const t = Date.now() - store.time;
  const d = new Date(store.time).toUTCString()
  
  let snippet;
  if (action == 'Read'){
    uri = uri.replace('/Mysql','').replace('/Mongodb','').replace('/Postgresql','')
    snippet = `axios.get('${uri}')
    .then((response)=>{const Result = response.data})`;
  }
  else if(action == 'Create'){
    snippet = `axios.post('${uri}', Values)
    .then((response)=>{const Result = response.data})`;
  }
  else if (action == 'Update'){
    snippet = `axios(
      {"method":'${method}', "url":'${uri}', "data":Values},
      {"headers": {"Content-Type":'multipart/form-data'}}
    )
    .then((response)=>{const Result = response.data})`;
  }
  else if (action == 'Delete'){
    snippet = `axios({
      "method":'${method}',
      "url":'${uri.substring(0,uri.indexOf('?'))}`;
      if(uri.indexOf('&')!=-1){ snippet += `?_method=DELETE'
    })` } else {snippet += `'
    })`}
    snippet += `
    .then((response)=>{ const Result = response.data })`;
  }
  
  return snippet;
  // axios.post('http://localhost:5000/snippet/', {"_id":_id, "snippet":snippet, "back":back, "ajax":'Axios', "uri":uri, "action":action, "db":store.db, "date":d, "time":t, "username":localStorage.getItem('username')});
}

function codemirror(rawSQL, snippet){
  const x = rawSQL.replaceAll('_id', 'id').replaceAll('`', '"').replace('"profile"','"profiles"')
  .replace('"id", "name", "age", "photo"', '*')
  .replaceAll(' OFFSET 0','')
  + `
  --------------------

` + snippet;

  localStorage.setItem('snippet', x);
}

export default {fget, fpost, fput, fdelete}