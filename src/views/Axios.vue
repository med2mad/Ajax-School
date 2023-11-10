<template>
  <Showresult :fget="fget" :fgetw="fgetw" :fpost="fpost" :fdelete="fdelete" :fput="fput" />
</template>

<script>
import axios from "axios";
export default {

  methods: {
      fget(uri, bucket, db){
        let time0 = performance.now();
        axios.get(uri)
        .then((response)=>{
            bucket.timeF = (performance.now() - time0).toFixed(2);
            bucket.a = response.data;
          })
        .catch((err)=>{bucket.a= 'err: ' + err.message})
      },

      async fgetw(uri){
        try {
          const response = await axios.get(uri)
          return response.data
        }
        catch(err) {return 'err: ' + err.message}
      },
      

      fpost(uri, body, limit, bucket){
        axios.post(uri,body)
        .then((response) => {
                const insertedId = response.data.id?response.data.id:response.data; //json-Server responds with an object
                const rowToInsert = {"id":insertedId, "timestamp":response.data.timestamp, "name":body.get("name"), "age":body.get("age"), "photo":response.data.photoName};
                // const rowToInsert = {"id":insertedId, "timestamp":response.data.timestamp, "name":body.name, "age":body.age, "photo":response.data.photoName};
                console.log(rowToInsert);
                bucket.a.unshift(rowToInsert);
                if(bucket.a.length>limit){bucket.a.pop();} //remove last row in <table> (respect _limit after add)
              })
        .catch((err) => {console.error(err.message)})
      },

      fput(uri, body, i, bucket){
        axios.put(uri, body)
          .then((response) => {bucket.a[i].name=body.get('name'); bucket.a[i].age=body.get('age'); bucket.a[i].photo=response.data.photoName;})
          .catch((err) => {console.error(err);});
      },

      fdelete(uri, lastTableId, bucket, db){
        axios.delete(uri+'?lasttableid='+lastTableId)
        .then((response)=>{
          //GET row to add instead of the deleted one
          if(db!='jsonserver' && response.data.length>0)
          { bucket.a.push({"id":response.data[0].id, "timestamp":response.data[0].timestamp, "name":response.data[0].name, "age":response.data[0].age, "photo":response.data[0].photo} )}
          else if(db=='jsonserver')
          {
          axios.get('http://localhost:3000/Resource1?id_lte='+ lastTableId +'&id_ne='+ lastTableId +'&_limit=1&_sort=id&_order=desc')
            .then((response)=>{
              if(response.data.length>0)
              { bucket.a.push({"id":response.data[0].id, "name":response.data[0].name, "age":response.data[0].age, "photo":response.data[0].photo}); }
            })
          }
        })
      .catch((err)=>{console.error(err.message)})
    },
  }
}
</script>