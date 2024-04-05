import { paginate } from '../scripts';

function fget(uri, bucket, limit, currentpage){
        bucket.snippet = `const xhr = new XMLHttpRequest(); xhr.onload=function(){const data = JSON.parse(xhr.responseText)}`
        bucket.snippet += `xhr.open("GET", ${uri}, true); xhr.send();`

        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
        if (xhr.status===200){
            bucket.time = xhr.getResponseHeader('X-Response-Time') || 'Unavailable';
            const response = JSON.parse(xhr.responseText);
            bucket.rows = response.rows;
            bucket.pagination = paginate(response.total, currentpage, limit, 10);//(number of filtered rows, current page, per page, max pages)
          }
        }
        xhr.open("GET", uri, true);
        xhr.send();
      }

function fpost(uri, body, bucket, limit){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
          const response = JSON.parse(xhr.responseText);
          bucket.rows.unshift({"id":response.newId, "_id":response.newId, "photo":response.photo, "name":body.get("name"), "age":body.get("age")});//FormData object use get
          if(bucket.rows.length>limit){bucket.rows.pop();} //remove last row in <table> (respect _limit after add)
        }
        xhr.open("POST", uri, true);
        xhr.send(body);
      }

function fput(method, uri, body, selectedTr, bucket){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
          const response = JSON.parse(xhr.responseText);
          bucket.rows[selectedTr].photo=response.photo; bucket.rows[selectedTr].name=body.get('name'); bucket.rows[selectedTr].age=body.get('age');
        }
        xhr.open(method, uri, true);
        xhr.send(body);
      }
      
function fdelete(method, uri, bucket){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
          const response = JSON.parse(xhr.responseText);
          if(response.length>0)
          { bucket.rows.push({"id":response[0].id, "_id":response[0]._id, "name":response[0].name, "age":response[0].age, "photo":response[0].photo}) }
        }
        xhr.open(method, uri, true);
        xhr.send();
      }

  function  fixHeader(){
    //const xhr = new XMLHttpRequest(); //create an object to work with in all calls
    //xhr.setRequestHeader('Content-Type', 'multipart/form-data');//throws "Multipart: Boundary not found" error
    //using JSON data (no FormData = no photos)
    //xhr.setRequestHeader('Content-Type', 'application/json');
    //xhr.send(JSON.stringify(body));
  }

  export default {fget, fpost, fput, fdelete}