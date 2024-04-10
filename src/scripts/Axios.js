import axios from 'axios';
import { paginate } from './others';

function fget(uri, bucket, limit, currentpage){
  axios.get(uri)
  .then((response)=>{
    // let t = ;
    // bucket.time = t;
    bucket.snippet += `------ GET ---- ${Date.now() - bucket.timeS} ms --------
    axios.get(${uri})
    .then((response)=>{const data = response.data})
    `;
    bucket.rows = response.data.rows;
    bucket.pagination = paginate(response.data.total, currentpage, limit, 10);
  });
}

function fpost(uri, body, bucket, limit){
  axios.post(uri,body)
  .then((response) => {
    bucket.nameError=false; bucket.ageError=false;
    if(response.data.errors){
      response.data.errors.forEach(error => { if(error.path=='name'){bucket.nameError=true}else{bucket.ageError=true} });
    }
    else{
        const rowToInsert = {"_id":response.data.newId, "photo":response.data.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get
        bucket.rows.unshift(rowToInsert);
        if(bucket.rows.length>limit){bucket.rows.pop();}//remove last row in <table> (respect _limit after add)
    }
  })
}

function fput(method, uri, body, selectedTr, bucket){
  axios({"method": method, "url": uri, "data":body}, {headers: {"Content-Type": "multipart/form-data"}})
  .then((response) => {
    bucket.rows[selectedTr].name=body.get('name'); bucket.rows[selectedTr].age=body.get('age'); bucket.rows[selectedTr].photo=response.data.photo;
  });
}

function fdelete(method, uri, bucket){
  axios({"method": method, "url": uri})
  .then((response)=>{
    //GET replacement row
    if(response.data.length>0)
    { bucket.rows.push({"_id":response.data[0]._id, "name":response.data[0].name, "age":response.data[0].age, "photo":response.data[0].photo}) }
  });
}

function fixHeader(){
  // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

export default {fget, fpost, fput, fdelete}