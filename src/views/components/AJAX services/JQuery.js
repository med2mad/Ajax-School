import $ from "jquery";
import Swal from 'sweetalert2';
import { paginate } from '../utils';

function fget(uri, store, limit, currentpage, back){
  $.ajax({"url":uri , "method":'GET', "dataType":'json'})
  .done(function(response){
    store.rows = response.rows;
    store.pagination = paginate(response.total, currentpage, limit, 10);
  })

  localStorage.setItem('snippet', saveSnippet('', back, uri, store, 'GET', 'Read'));
}

function fpost(uri, body, store, limit, back){
  $.ajax(
    {
      "type": 'POST',
      "url": uri,
      "data": body,
      "contentType": false,
      "processData": false,
    }
  )
  .done(function(response){
    const rowToInsert = {"id":response.newId, "_id":response.newId, "photo":response.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get
    store.rows.unshift(rowToInsert);
    if(store.rows.length>limit){store.rows.pop();} //remove last row in <table> (respect limit after add)
  })

  localStorage.setItem('snippet', saveSnippet('', back, uri, store, 'POST', 'Create'));
}

function fput(method, uri, body, selectedTr, store, back){
  $.ajax({"type":method, "url":uri, "data":body})
  .done( function(response){
    store.rows[selectedTr].name=body.get('name'); store.rows[selectedTr].age=body.get('age'); store.rows[selectedTr].photo=response.photo;
  })

  localStorage.setItem('snippet', saveSnippet('', back, uri, store, method, 'Update'));
}

function fdelete(method, uri, store, back){
  $.ajax({"type":method, "url":uri})
  .done( function(response){
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
    uri = uri.replace('/Mysql','').replace('/Mongoodb','').replace('/Postgresql','')
    snippet = `$ajax({"url":'${uri}' , "method":'GET', "dataType":'json'})
    .done(function(response){ const Result = response })`;
  }
  else if(action == 'Create'){
    snippet = `$.ajax({
      "type":'POST', 
      "url":'${uri}', 
      "contentType":false, "processData":false, 
      "data":payload
    })
    .done(function(response){ const Result = response })`;
  }
  else if (action == 'Update'){
    snippet = `$.ajax({"type":'${method}', "url":'${uri}', "data":payload})
    .done(function(response){ const Result = response })`;
  }
  else if (action == 'Delete'){
    snippet = `$.ajax({"type":'${method}', "url":'${uri.substring(0,uri.indexOf('?'))}`;
    if(uri.indexOf('&')!=-1){ snippet += `?_method=DELETE'`} else {snippet += `'`}
    snippet += `
    .done(function(response){ const Result = response })`;
  }

  return snippet;
  //axios.post('http://localhost:5000/snippet/', {"_id":_id, "snippet":snippet, "back":back, "ajax":'Axios', "uri":uri, "action":action, "db":store.db, "date":d, "time":t, "username":localStorage.getItem('username')});
}

export default {fget, fpost, fput, fdelete}