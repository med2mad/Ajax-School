import axios from 'axios';
import Swal from 'sweetalert2';
import { paginate } from '../utils';

function fget(uri, store, limit, currentpage, back){
  axios.get(uri)
  .then((response)=>{
    store.rows = response.data.rows;
    store.pagination = paginate(response.data.total, currentpage, limit, 10);
  })
  .catch((err)=>{
    console.log(err);
  });
  
  localStorage.setItem('snippet', saveSnippet('', back, uri, store, 'GET', 'Read'));
}

function fpost(uri, body, store, limit, back){
  axios.post(uri,body)
  .then((response) => {
    store.nameError=false; store.ageError=false;
    if(response.data.errors){
      response.data.errors.forEach(error => { if(error.path=='name'){store.nameError=true}else{store.ageError=true} });
    }
    else{
      const rowToInsert = {"_id":response.data.newId, "photo":response.data.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get
      store.rows.unshift(rowToInsert);
      if(store.rows.length>limit){store.rows.pop();}//remove last row in <table> (respect limit after add)
    }
  })
  .catch((err)=>{
    if(err.response && err.response.status == 401){
      Swal.fire('Login again please.');
    }
  });

  localStorage.setItem('snippet', saveSnippet('response.data.newId', back, uri, store, 'POST', 'Create'));
}

function fput(method, uri, body, selectedTr, store, back){
  axios({"method":method, "url":uri, "data":body}, {"headers": {"Content-Type":'multipart/form-data'}})
  .then((response) => {
    store.nameError=false; store.ageError=false;
    if(response.data.errors){
      response.data.errors.forEach(error => { if(error.path=='name'){store.nameError=true}else{store.ageError=true} });
    }
    else{
      store.rows[selectedTr].name=body.get('name'); store.rows[selectedTr].age=body.get('age'); store.rows[selectedTr].photo=response.data.photo;
    }
  })
  .catch((err)=>{
    if(err.response && err.response.status == 401){
      Swal.fire('Login again please.');
    }
  });

  localStorage.setItem('snippet', saveSnippet('response.data.editedId', back, uri, store, method, 'Update'));
}

function fdelete(method, uri, store, back){
  axios({"method":method, "url":uri})
  .then((response)=>{
    //GET replacement row
    if(response.data.rows.length>0)
    { store.rows.push({"_id":response.data.rows[0]._id, "name":response.data.rows[0].name, "age":response.data.rows[0].age, "photo":response.data.rows[0].photo}) }
  })

  localStorage.setItem('snippet', saveSnippet('response.data.deletedId', back, uri, store, method, 'Delete'))
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
    snippet = `axios.post('${uri}', Value)
    .then((response)=>{const Result = response.data})`;
  }
  else if (action == 'Update'){
    snippet = `axios(
      {"method":'${method}', "url":'${uri}', "data":Value},
      {"headers": {"Content-Type":'multipart/form-data'}}
    )
    .then((response)=>{const Result = response.data})`;
  }
  else if (action == 'Delete'){
    snippet = `axios({
      "method":'${method}',
      "url":'${uri.substring(0,uri.indexOf('?'))}`;
      if(uri.indexOf('&')!=-1){ snippet += `?_method=DELETE'})` } else {snippet += `'
    })`}
    snippet += `
    .then((response)=>{ const Result = response.data })`;
  }
  
  return snippet;
  // axios.post('http://localhost:5000/snippet/', {"_id":_id, "snippet":snippet, "back":back, "ajax":'Axios', "uri":uri, "action":action, "db":store.db, "date":d, "time":t, "username":localStorage.getItem('username')});
}

export default {fget, fpost, fput, fdelete}