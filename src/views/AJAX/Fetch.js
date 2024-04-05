import { paginate } from '../scripts';

function fget(uri, bucket, limit, currentpage){
        bucket.snippet = `fetch.get(${uri}).then((response)=>{return response.json()}).then((response)=>{const data = response})`;

        fetch(uri)
        .then((response)=> {
            bucket.time = response.headers.get('X-Response-Time') || 'Unavailable';
            if(response.ok){ return response.json() } else {throw new Error("[!response.ok]")} 
          })
        .then((response)=>{
            bucket.rows = response.rows;
            bucket.pagination = paginate(response.total, currentpage, limit, 10);//(number of filtered rows, current page, per page, max pages)
          })
      }

function fpost(url, body, bucket, limit){
        fetch(url, {
          method: "POST", 
          body: body
          })
        .then((response)=> {return response.json()})
        .then((response)=>{
                const rowToInsert = {"id":response.newId, "_id":response.newId, "photo":response.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get 
                bucket.rows.unshift(rowToInsert);
                if(bucket.rows.length>limit){bucket.rows.pop();} //remove last row in <table> (respect _limit after add)
              })
      }

function fput(method, uri, body, selectedTr, bucket){
        fetch(uri, {
            method: method,
            body: body
        })
        .then((response)=> {return response.json()})
        .then((response)=> {
          bucket.rows[selectedTr].name=body.get('name'); bucket.rows[selectedTr].age=body.get('age');bucket.rows[selectedTr].photo=response.photo;
        })
      }

function fdelete(method, url, bucket){
        fetch(url, {method: method})
        .then((response)=>{return response.json()})
        .then((response)=>{
          //GET replacement row
          if(response.length>0)
          { bucket.rows.push({"id":response[0].id, "_id":response[0]._id, "name":response[0].name, "age":response[0].age, "photo":response[0].photo}) }
        })
      }

    function fixHeader(){
    // const defaultHeaders = new Headers(); //create an object to work with in all calls
    // defaultHeaders.append('Content-Type', 'application/json; charset=utf-8');
    ////setting "Content-Type" to "multipart/form-data" throws "Multipart: Boundary not found" error

    //body: JSON.stringify(body), headers: {"Content-Type":"application/json"} //if data send as JSON not as FormData (no photos)
  }

  export default {fget, fpost, fput, fdelete}