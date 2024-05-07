import $ from "jquery";
import { paginate } from '../pagination';

function fget(uri, store, limit, currentpage, back){
  $.ajax({url:uri , method:'GET', dataType:'json'})
    .done(function(response, textStatus, jqXHR){
      store.snippet += `------ GET ---- ${Date.now() - store.time} ms --------\n$.ajax({url:${uri} , method:'GET', dataType:'json'})
      .done(function(response, textStatus, jqXHR){const data = response})\n\n`;

      store.rows = response.rows;
      store.pagination = paginate(response.total, currentpage, limit, 10);//(number of filtered rows, current page, per page, max pages)
    });
}

function fpost(uri, body, store, limit, back){
  $.ajax(
    {
      type:'POST',
      contentType: false,
      processData: false,
      url:uri,
      data: body,
    }
  )
  .done(function(response){
    const rowToInsert = {"id":response.newId, "_id":response.newId, "photo":response.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get
    store.rows.unshift(rowToInsert);
    if(store.rows.length>limit){store.rows.pop();} //remove last row in <table> (respect _limit after add)
  });
}

function fput(method, uri, body, selectedTr, store, back){
  $.ajax(
    {
      "type":method, 
      "url":uri, 
      "data":body,
    }
  )
  .done( function(response){
    store.rows[selectedTr].name=body.get('name'); store.rows[selectedTr].age=body.get('age'); store.rows[selectedTr].photo=response.photo;
  });
}
  
function fdelete(method, uri, store, back){
  $.ajax(
    {
    "type":method, 
    "url":uri
    }
  )
  .done( function(response){
    //GET replacement row
    if(response.length>0)
    { store.rows.push({"id":response[0].id, "_id":response[0]._id, "name":response[0].name, "age":response[0].age, "photo":response[0].photo}) }
  });
}

export default {fget, fpost, fput, fdelete}