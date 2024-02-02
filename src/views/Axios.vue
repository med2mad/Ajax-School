<template>
  <Showresult :fget="fget" :fgetw="fgetw" :fpost="fpost" :fdelete="fdelete" :fput="fput" />
</template>

<script>
import axios from "axios";
import paginate from 'jw-paginate';
export default {
  methods: {
      fget(uri, bucket){
        let time0 = performance.now();
        axios.get(uri)
        .then((response)=>{
          console.log(response.data.total);
                 console.log(response.data.total);
            bucket.timeF = (performance.now() - time0).toFixed(2);
            bucket.rows = response.data.rows;
            bucket.total = response.data.total;
            bucket.pages = paginate(response.data.total, 1, bucket.limit, 10);
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
                const rowToInsert = {"_id":response.data.newId, "photo":response.data.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get
                bucket.rows.unshift(rowToInsert);
                if(bucket.rows.length>limit){bucket.rows.pop();} //remove last row in <table> (respect _limit after add)
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
  }
}
</script>