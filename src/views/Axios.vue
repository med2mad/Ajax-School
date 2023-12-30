<template>
  <Showresult :fget="fget" :fgetw="fgetw" :fpost="fpost" :fdelete="fdelete" :fput="fput" />
</template>

<script>
import axios from "axios";
export default {
  methods: {
      fget(uri, bucket){
        let time0 = performance.now();
        axios.get(uri)
        .then((response)=>{
            bucket.timeF = (performance.now() - time0).toFixed(2);
            bucket.a = response.data;
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
        console.log(uri);
        axios.post(uri,body)
          .then((response) => {
                const rowToInsert = {"_id":response.data.newId, "photo":response.data.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get
                bucket.a.unshift(rowToInsert);
                if(bucket.a.length>limit){bucket.a.pop();} //remove last row in <table> (respect _limit after add)
            })
      },

      fput(method, uri, body, i, bucket){
        axios({"method": method, "url": uri, "data":body}, {headers: {"Content-Type": "multipart/form-data"}})
          .then((response) => {
              bucket.a[i].name=body.get('name'); bucket.a[i].age=body.get('age'); bucket.a[i].photo=response.data.photo;
            })
      },

      fdelete(uri, lastTableId, bucket){
        axios.delete(uri+'?lasttableid='+lastTableId)
        .then((response)=>{
            //GET replacement row
            if(response.data.length>0)
            { bucket.a.push({"id":response.data[0].id, "_id":response.data[0]._id, "name":response.data[0].name, "age":response.data[0].age, "photo":response.data[0].photo}) }
            // else if(_db=='jsonserver')
            // {
            // axios.get('http://localhost:3000/Resource1?id_lte='+ lastTableId +'&id_ne='+ lastTableId +'&_limit=1&_sort=id&_order=desc')
            //   .then((response)=>{
            //       if(response.data.length>0)
            //       { bucket.a.push({"id":response.data[0].id, "name":response.data[0].name, "age":response.data[0].age, "photo":response.data[0].photo}); }
            //   })
            // }
          })
    },
  }
}
</script>