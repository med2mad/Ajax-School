import Swal from 'sweetalert2';
import { paginate } from './pagination';

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
    
    saveSnippet(response.newId, back, uri, store, 'POST', 'Create');
  })
  .catch((err)=>{
    if(err.response && err.response.status == 401){
      Swal.fire('Login again please.');
    }
  });
}

function fput(method, uri, body, selectedTr, store, back){
  fetch(uri, {"method":method, "body": body})
  .then((response)=> {
    return response.json()
  })
  .then((response)=> {
    store.rows[selectedTr].name=body.get('name'); store.rows[selectedTr].age=body.get('age');store.rows[selectedTr].photo=response.photo;
    saveSnippet(response.editedId, back, uri, store, method, 'Update');
  })
  .catch((err)=>{
    if(err.response && err.response.status == 401){
      Swal.fire('Login again please.');
    }
  });
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
  
    saveSnippet(response.deletedId, back, uri, store, method, 'Delete');
  })
}



function saveSnippet(_id, back, uri, store, method, action){
  const t = Date.now() - store.time;
  const d = `${store.time.getDate()}/${store.time.getMonth()+1}/${store.time.getFullYear()} ${store.time.getHours()}:${store.time.getMinutes()}:${store.time.getSeconds()}`
  
  let snippet;
  if(action == 'Create')
    snippet = `fetch('${uri}', {"method":'POST', "body":data})
  .then((response)=>{return response.json()}).then((response)=>{const data = response})`;
  else if (action == 'Update')
    snippet = `fetch('${uri}', {"method":'${method}', "body":data})
  .then((response)=>{return response.json()}).then((response)=>{const data = response})`;
  else if (action == 'Delete')
    snippet = `fetch('${uri}', {"method":'${method}'})
  .then((response)=>{return response.json()}).then((response)=>{const data = response})`;

  // axios.post('http://localhost:5000/snippet/', {"_id":_id, "snippet":snippet, "back":back, "ajax":'Axios', "uri":uri, "action":action, "db":store.db, "date":d, "time":t, "username":localStorage.getItem('username')});
}

export default {fget, fpost, fput, fdelete}