<template>
  <Showresult title="Axios" :fget="fget" :fgetw="fgetw" :fpost="fpost" :fput="fput" :fdelete="fdelete">
      <template v-slot:comment>//Requires installing "axios" module in the client side (using CDN link or installing throught CLI [npm])</template>
  </Showresult>
</template>

<script>
import axios from "axios";
export default {
  methods: {
      fget(uri, bucket){ 
        axios.get(uri)
        .then((response)=>{bucket.a = response.data; })
        .catch((err)=>{bucket.a = 'err: ' + err.message})
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
                const id = response.data.id?response.data.id:response.data; //json responds with an object
                bucket.a.unshift({"id":id, "_id":id, "name":body.name, "age":body.age, "photo":body.photo});
              if(bucket.a.length>limit){bucket.a.pop();} //remove last row in <table> (respect _limit after add)
              })
        .catch((err) => {console.error(err.message)})
      },

      fput(uri, body){
        axios.put(uri, body)
          .then((response) => {console.log(response.data);})
          .catch((err) => {console.error(err);});
      },

      fdelete(uri){
        axios.delete(uri)
        .then((response)=>{console.log(response.data);})
        .catch((err)=>{console.error(err.message)})
      },
  }
}
</script>