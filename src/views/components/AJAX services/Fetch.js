import Swal from 'sweetalert2';
import { paginate } from '../utils';

function fget(uri, store, limit, currentpage, back){
  fetch(uri)
  .then((response)=> {
    if(response.ok){ return response.json() } else {throw new Error("[!response.ok]")} 
  })
  .then((response)=>{
    store.rows = response.rows;
    store.pagination = paginate(response.total, currentpage, limit, 10);
  })
  .catch((err)=>{
    console.log(err);
  });

  localStorage.setItem('snippet', saveSnippet('', back, uri, store, 'GET', 'Read'));
}

function fpost(uri, body, store, limit, back){
  fetch(uri, {"method":'POST', "body":body})
  .then((response)=> {
    return response.json()
  })
  .then((response)=>{
    const rowToInsert = {"id":response.newId, "_id":response.newId, "photo":response.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get 
    store.rows.unshift(rowToInsert);
    if(store.rows.length>limit){store.rows.pop();} //remove last row in <table> (respect limit after add)
  })
  .catch((err)=>{
    if(err.response && err.response.status == 401){
      Swal.fire('Login again please.');
    }
  });

  localStorage.setItem('snippet', saveSnippet('', back, uri, store, 'POST', 'Create'));
}

function fput(method, uri, body, selectedTr, store, back){
  fetch(uri, {"method":method, "body": body})
  .then((response)=> {
    return response.json()
  })
  .then((response)=> {
    store.rows[selectedTr].name=body.get('name'); store.rows[selectedTr].age=body.get('age');store.rows[selectedTr].photo=response.photo;
  })
  .catch((err)=>{
    if(err.response && err.response.status == 401){
      Swal.fire('Login again please.');
    }
  });

  localStorage.setItem('snippet', saveSnippet('', back, uri, store, method, 'Update'));
}

function fdelete(method, uri, store, back){
  fetch(uri, {"method": method})
  .then((response)=>{
    return response.json()
  })
  .then((response)=>{
    //GET replacement row
    if(response.rows.length>0)
    { store.rows.push({"id":response.rows[0].id, "_id":response.rows[0]._id, "name":response.rows[0].name, "age":response.rows[0].age, "photo":response.rows[0].photo}) }
  })

  localStorage.setItem('snippet', saveSnippet('', back, uri, store, method, 'Delete'));
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

export default {fget, fpost, fput, fdelete}