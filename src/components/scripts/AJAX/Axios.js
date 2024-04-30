import axios from 'axios';
import { paginate } from '../pagination';

function fget(uri, store, limit, currentpage, back){
  axios.get(uri)
  .then((response)=>{
    store.snippet += `------ GET -- ${back}:Axios -- [${Date.now() - store.time} ms] -------- ${store.time.getDate()}/${store.time.getMonth()+1}/${store.time.getFullYear()} ${store.time.getHours()}:${store.time.getMinutes()}:${store.time.getSeconds()}
    axios.get(${uri})\n.then((response)=>{const data = response.data})\n\n`;
    store.rows = response.data.rows;
    store.pagination = paginate(response.data.total, currentpage, limit, 10);
  });
}

function fpost(uri, body, store, limit, back){
  axios.post(uri,body)
  .then((response) => {
    store.snippet += `------ POST -- ${back}:Axios -- [${Date.now() - store.time} ms] -------- ${store.time.getDate()}/${store.time.getMonth()+1}/${store.time.getFullYear()} ${store.time.getHours()}:${store.time.getMinutes()}:${store.time.getSeconds()}
    axios.post(${uri})\n.then((response)=>{const data = response.data})\n\n`;
    store.nameError=false; store.ageError=false;
    if(response.data.errors){
      response.data.errors.forEach(error => { if(error.path=='name'){store.nameError=true}else{store.ageError=true} });
    }
    else{
      const rowToInsert = {"_id":response.data.newId, "photo":response.data.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get
      store.rows.unshift(rowToInsert);
      if(store.rows.length>limit){store.rows.pop();}//remove last row in <table> (respect _limit after add)
    }
  })
}

function fput(method, uri, body, selectedTr, store, back){
  axios({"method": method, "url": uri, "data":body}, {headers: {"Content-Type": "multipart/form-data"}})
  .then((response) => {
    store.snippet += `------ PUT -- ${back}:Axios -- [${Date.now() - store.time} ms] -------- ${store.time.getDate()}/${store.time.getMonth()+1}/${store.time.getFullYear()} ${store.time.getHours()}:${store.time.getMinutes()}:${store.time.getSeconds()}
    axios({"method": ${method}, "url": ${uri}, "data":body}, {headers: {"Content-Type": "multipart/form-data"}})\n.then((response)=>{const data = response.data})\n\n`;
    store.rows[selectedTr].name=body.get('name'); store.rows[selectedTr].age=body.get('age'); store.rows[selectedTr].photo=response.data.photo;
  });
}

function fdelete(method, uri, store, back){
  axios({"method": method, "url": uri})
  .then((response)=>{
    store.snippet += `------ DELETE -- ${back}:Axios -- [${Date.now() - store.time} ms] -------- ${store.time.getDate()}/${store.time.getMonth()+1}/${store.time.getFullYear()} ${store.time.getHours()}:${store.time.getMinutes()}:${store.time.getSeconds()}
    axios({"method": ${method}, "url": ${uri}})\n.then((response)=>{const data = response.data})\n\n`;
    //GET replacement row
    if(response.data.length>0)
    { store.rows.push({"_id":response.data[0]._id, "name":response.data[0].name, "age":response.data[0].age, "photo":response.data[0].photo}) }
  });
}

function fixHeader(){
  // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

export default {fget, fpost, fput, fdelete}