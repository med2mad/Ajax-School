<template>
  <Showresult :fget="fget" :fgetw="fgetw" :fpost="fpost" :fdelete="fdelete" :fput="fput" />
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
        // const fd = new FormData();
        // fd.append('name', body.name);
        // fd.append('age', body.age);
        // fd.append('photo', body.photo);

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
      
      fdelete(url, lastTableId, bucket, db){
        fetch(url, {method: "DELETE"})
        .then((response)=>{return response.json()})
        .then((response)=>{
          console.log(response);
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
        .catch((err)=>{console.log('err: ' + err.message)})
      }
  }
}
</script>