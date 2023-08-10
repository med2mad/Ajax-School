<template>
  <Showresult title="Fetch" :fget="fget" :fgetw="fgetw" :fpost="fpost" :fdelete="fdelete" :fput="fput">
      <template v-slot:comment>//Require installing "Cors" on the server side using CLI [npm i cors]</template>
  </Showresult>
</template>

<script>
export default {
  methods: {
      fget(uri,bucket){ 
        let time0 = performance.now();
        fetch(uri)
        .then((response)=> {if(response.ok){ return response.json() } else {throw new Error("[!response.ok]")} })
        .then((data)=>{
                      bucket.timeF = (performance.now() - time0).toFixed(2);  
                      bucket.a = data;
                      })
        .catch((err)=>{ bucket.a = 'err: ' + err.message })
      },
      async fgetw(uri){
        try {
          const response = await fetch(uri)
          if(!response.ok){throw new Error("[!response.ok]")}
          const data = await response.json()
          return data
        }
        catch(err) {return 'err: ' + err.message}
      },

      fpost(url, body, bucket, limit){
        fetch(url, {
          method: "POST", 
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(body)
          })
        .then((response)=> {return response.json()})
        .then((data)=>{
                const id = data.id?data.id:data; //json-Server responds with an object
                bucket.a.unshift({"id":id, "_id":id, "name":body.name, "age":body.age, "photo":body.photo});
                if(bucket.a.length>limit){bucket.a.pop();} //remove last row in <table> (respect _limit after add)
              })
        .catch((err)=>{console.log('err: ' + err.message)})
      },

      fput(url, body){
        fetch(url, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(body)
        })
        .then((response)=> {return response.json()})
        .then((data)=>{console.log(data);})
        .catch((err)=>{console.log('err: ' + err.message)})
      },
      
      fdelete(url){
        fetch(url, {method: "DELETE"})
        .then((response)=>{return response.json()})
        .then((data)=>{console.log(data);})
        .catch((err)=>{console.log('err: ' + err.message)})
      }
  }
}
</script>