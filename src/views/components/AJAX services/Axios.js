import axios from 'axios';
import Swal from 'sweetalert2';
import { paginate } from './pagination';

function fget(uri, store, limit, currentpage, back){
  axios.get(uri)
  .then((response)=>{
    store.rows = response.data.rows;
    store.pagination = paginate(response.data.total, currentpage, limit, 10);
  })
  .catch((err)=>{
    console.log(err);
  });
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
      if(store.rows.length>limit){store.rows.pop();}//remove last row in <table> (respect _limit after add)

      saveSnippet(response.data.newId, back, uri, store, 'POST', 'Create');
    }
  })
  .catch((err)=>{
    if(err.response && err.response.status == 401){
      Swal.fire('Login again please.');
    }
  });
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
      saveSnippet(response.data.editedId, back, uri, store, method, 'Update');
    }
  })
  .catch((err)=>{
    if(err.response && err.response.status == 401){
      Swal.fire('Login again please.');
    }
  });
}

function fdelete(method, uri, store, back){
  axios({"method":method, "url":uri})
  .then((response)=>{
    //GET replacement row
    if(response.data.rows.length>0)
    { store.rows.push({"_id":response.data.rows[0]._id, "name":response.data.rows[0].name, "age":response.data.rows[0].age, "photo":response.data.rows[0].photo}) }

    saveSnippet(response.data.deletedId, back, uri, store, method, 'Delete');
  })
}



function saveSnippet(_id, back, uri, store, method, action){
  const t = Date.now() - store.time;
  const d = new Date(store.time).toUTCString()
  
  let snippet;
  if(action == 'Create')
    snippet = `axios.post('${uri}', body)<br>.then((response)=>{const data = response.data})`;
  else if (action == 'Update')
    snippet = `axios(<br>{"method":'${method}', "url":'${uri}', "data":body},<br>{"headers": {"Content-Type":'multipart/form-data'}}<br>)<br>.then((response)=>{const data = response.data})`;
  else if (action == 'Delete')
    snippet = `axios({"method":'${method}', "url":'${uri}'})<br>.then((response)=>{const data = response.data})`;
  
  // axios.post('http://localhost:5000/snippet/', {"_id":_id, "snippet":snippet, "back":back, "ajax":'Axios', "uri":uri, "action":action, "db":store.db, "date":d, "time":t, "username":localStorage.getItem('username')});
}

export default {fget, fpost, fput, fdelete}