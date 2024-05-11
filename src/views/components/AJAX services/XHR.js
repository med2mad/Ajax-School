import { paginate } from './pagination';

function fget(uri, store, limit, currentpage, back){
  const xhr = new XMLHttpRequest();
  xhr.onload=function(){
    store.snippet += `------ GET ---- ${Date.now() - store.time} ms --------\nconst xhr = new XMLHttpRequest();
    xhr.onload = function(){const data = JSON.parse(xhr.responseText)}\nxhr.open("GET", ${uri}, true);\nxhr.send();\n\n`
  
    if(xhr.status===200){
      const response = JSON.parse(xhr.responseText);
      store.rows = response.rows;
      store.pagination = paginate(response.total, currentpage, limit, 10);//(number of filtered rows, current page, per page, max pages)
    }
  }
  xhr.open("GET", uri, true);
  xhr.send();
}

function fpost(uri, body, store, limit, back){
  const xhr = new XMLHttpRequest();
  xhr.onload=function(){
    const response = JSON.parse(xhr.responseText);
    store.rows.unshift({"id":response.newId, "_id":response.newId, "photo":response.photo, "name":body.get("name"), "age":body.get("age")});//FormData object use get
    if(store.rows.length>limit){store.rows.pop();} //remove last row in <table> (respect _limit after add)
  }
  xhr.open("POST", uri, true);
  xhr.send(body);
}

function fput(method, uri, body, selectedTr, store, back){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
          const response = JSON.parse(xhr.responseText);
          store.rows[selectedTr].photo=response.photo; store.rows[selectedTr].name=body.get('name'); store.rows[selectedTr].age=body.get('age');
        }
        xhr.open(method, uri, true);
        xhr.send(body);
      }
      
function fdelete(method, uri, store, back){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
          const response = JSON.parse(xhr.responseText);
          if(response.length>0)
          { store.rows.push({"id":response[0].id, "_id":response[0]._id, "name":response[0].name, "age":response[0].age, "photo":response[0].photo}) }
        }
        xhr.open(method, uri, true);
        xhr.send();
      }

  export default {fget, fpost, fput, fdelete}