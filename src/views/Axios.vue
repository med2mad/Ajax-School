<template>
  <Showresult title="Axios" :fget="fget" :fgetw="fgetw" :fpost="fpost" :fput="fput" :fdelete="fdelete">
      <template v-slot:comment>//Requires installing "axios" module in the client side (using CDN link or installing throught CLI [npm])</template>
  </Showresult>
</template>

<script>
import axios from "axios";
export default {
  methods: {
      fget(uri, bucket,p){ 
        axios.get('text.html')
        .then((response)=>{bucket[p] = response.data; })
        .catch((err)=>{bucket[p] = 'err: ' + err.message})
      },
      async fgetw(uri){
        try {
          const response = await axios.get(uri)
          return response.data
        }
        catch(err) {return 'err: ' + err.message}
      },
      
      fpost(uri, body){
         axios.post(uri,body)
        .then((response)=>{console.log(response.data);})
        .catch((err)=>{console.log('err: ' + err.message)})
      },

      fput(uri, body){
        axios.put(uri, body)
          .then((response) => {console.log(response.data);})
          .catch((err) => {console.error(err);});
      },

      fdelete(uri){
        axios.delete(uri)
        .then((response)=>{console.log(response.data);})
        .catch((err)=>{console.log('err: ' + err.message)})
      }
  }
}
</script>