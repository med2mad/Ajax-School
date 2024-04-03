<template>
  <Showresult :fget="fget" :fgetw="fgetw" :fpost="fpost" :fdelete="fdelete" :fput="fput" />
</template>

<script>
import { paginate } from './scripts';

export default {
  methods: {
      fget(uri, bucket, limit, currentpage){
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
      },

      fpost(uri, body, bucket, limit){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
          const response = JSON.parse(xhr.responseText);
          bucket.rows.unshift({"id":response.newId, "_id":response.newId, "photo":response.photo, "name":body.get("name"), "age":body.get("age")});//FormData object use get
          if(bucket.rows.length>limit){bucket.rows.pop();} //remove last row in <table> (respect _limit after add)
        }
        xhr.open("POST", uri, true);
        xhr.send(body);
      },

      fput(uri, body, i, bucket){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
          const response = JSON.parse(xhr.responseText);
          bucket.rows[i].photo=response.photo; bucket.rows[i].name=body.get('name'); bucket.rows[i].age=body.get('age');
        }
        xhr.open("PUT", uri, true);
        xhr.send(body);
      },
      
      fdelete(uri, lastTableId, bucket){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
          const response = JSON.parse(xhr.responseText);
          if(response.length>0)
          { bucket.rows.push({"id":response[0].id, "_id":response[0]._id, "name":response[0].name, "age":response[0].age, "photo":response[0].photo}) }
        }
        xhr.open("DELETE", uri+'?lasttableid='+lastTableId, true);
        xhr.send();
      }
  },
  mounted(){
    //const xhr = new XMLHttpRequest(); //create an object to work with in all calls
    //xhr.setRequestHeader('Content-Type', 'multipart/form-data');//throws "Multipart: Boundary not found" error
    //using JSON data (no FormData = no photos)
    //xhr.setRequestHeader('Content-Type', 'application/json');
    //xhr.send(JSON.stringify(body));
  },
}
</script>