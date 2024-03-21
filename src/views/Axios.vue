<template>
  <Showresult :fget="fget" :fgetw="fgetw" :fpost="fpost" :fdelete="fdelete" :fput="fput" />
</template>

<script>
import axios from 'axios';
import { paginate } from './scripts';

export default {
  methods: {
      fget(uri, bucket, limit, currentpage){
        axios.get(uri)
        .then((response)=>{
            bucket.time = response.headers['x-response-time'];
            bucket.rows = response.data.rows;
            bucket.pagination = paginate(response.data.total, currentpage, limit, 10);
          })
      },

      async fgetw(uri){
        try {
          const response = await axios.get(uri)
          return response.data
        }
        catch(err) {return 'err: ' + err.message}
      },
      

      fpost(uri, body, bucket, limit){
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
      },

      fput(method, uri, body, i, bucket){
        axios({"method": method, "url": uri, "data":body}, {headers: {"Content-Type": "multipart/form-data"}})
          .then((response) => {
              bucket.rows[i].name=body.get('name'); bucket.rows[i].age=body.get('age'); bucket.rows[i].photo=response.data.photo;
            })
      },

      fdelete(method, uri, bucket){
        axios({"method": method, "url": uri})
        .then((response)=>{
            //GET replacement row
            if(response.data.length>0)
            { bucket.rows.push({"_id":response.data[0]._id, "name":response.data[0].name, "age":response.data[0].age, "photo":response.data[0].photo}) }
          })
    },

  },

  mounted(){
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  },
}
</script>