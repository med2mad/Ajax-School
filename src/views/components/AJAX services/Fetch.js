import Swal from 'sweetalert2';
import { paginate } from '../utils';
import axios from 'axios';

async function fget(uri, store, limit, currentpage, back){
  await axios.get('http://localhost:5000/table_name?table_name=profiles_'+localStorage.getItem('username'))

  const response = await fetch(uri)
  if (!response.ok) { throw new Error("[!response.ok] " + response.status); }
  const data = await response.json();
  store.rows = data.rows;
  store.pagination = paginate(data.total, currentpage, limit, 10);
  codemirror(data.rawSQL, saveSnippet('', back, uri, store, 'GET', 'Read'));
}

async function fpost(uri, body, store, limit, back){
  try {
    const response = await fetch(uri, {"method":'POST', "body":body})
    if (!response.ok) { throw new Error("[!response.ok] " + response.status); }
    const data = await response.json()
    const rowToInsert = {"id":data.newId, "_id":data.newId, "photo":data.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get 
    store.rows.unshift(rowToInsert);
    if(store.rows.length>limit){store.rows.pop();} //remove last row in <table> (respect limit after add)
    codemirror(data.rawSQL, saveSnippet('', back, uri, store, 'POST', 'Create'));
  } catch (error) {
    if(error.response && error.response.status == 401){
      Swal.fire('Login again please.');
    }
  }
}

async function fput(method, uri, body, selectedTr, store, back){
  try {
    const response = await fetch(uri, {"method":method, "body": body})
    if (!response.ok) { throw new Error("[!response.ok] " + response.status); }
    const data = await response.json()
    store.rows[selectedTr].name=body.get('name'); store.rows[selectedTr].age=body.get('age');store.rows[selectedTr].photo=data.photo;
    codemirror(data.rawSQL, saveSnippet('data.editedId', back, uri, store, method, 'Update'));
  } catch (error) {
    if(error.response && error.response.status == 401){
      Swal.fire('Login again please.');
    }
  }
}

async function fdelete(method, uri, store, back){
  const response = await fetch(uri, {"method": method})
  if (!response.ok) { throw new Error("[!response.ok] " + response.status); }
  const data = await response.json()
  //GET replacement row
  if(data.rows.length>0)
  { store.rows.push({"id":data.rows[0].id, "_id":data.rows[0]._id, "name":data.rows[0].name, "age":data.rows[0].age, "photo":data.rows[0].photo}) }

  codemirror(data.rawSQL, saveSnippet('', back, uri, store, method, 'Delete'));
}



function saveSnippet(_id, back, uri, store, method, action){
  const t = Date.now() - store.time;
  const d = `${store.time.getDate()}/${store.time.getMonth()+1}/${store.time.getFullYear()} ${store.time.getHours()}:${store.time.getMinutes()}:${store.time.getSeconds()}`
  
  let snippet;
  if (action == 'Read'){
    uri = uri.replace('/Mysql','').replace('/Mongodb','').replace('/Postgresql','')
    snippet = `fetch('${uri}')
    .then((response)=>{ return response.json() })
    .then((response)=>{ const Result = response })`;
  }
  else if (action == 'Create'){
    snippet = `fetch('${uri}', {"method":'POST', "body":Values})
    .then((response)=>{ return response.json() })
    .then((response)=>{ const Result = response })`;
  }
  else if (action == 'Update'){
    snippet = `fetch('${uri}', {"method":'${method}', "body":Values})
    .then((response)=>{ return response.json() })
    .then((response)=>{ const Result = response })`;
  }
  else if (action == 'Delete'){
    snippet = `fetch('${uri.substring(0,uri.indexOf('?'))}`;
    if(uri.indexOf('&')!=-1){ snippet += `?_method=DELETE'`} else {snippet += `'`}
    snippet += `, {"method":'${method}'})
    .then((response)=>{ return response.json() })
    .then((response)=>{ const Result = response })`;
  }

  return snippet;
  //axios.post('http://localhost:5000/snippet/', {"_id":_id, "snippet":snippet, "back":back, "ajax":'Axios', "uri":uri, "action":action, "db":store.db, "date":d, "time":t, "username":localStorage.getItem('username')});
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