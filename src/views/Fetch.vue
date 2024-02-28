<template>
  <Showresult :fget="fget" :fgetw="fgetw" :fpost="fpost" :fdelete="fdelete" :fput="fput" />
</template>

<script>
import { paginate } from './utils/others';

export default {

  methods: {
      fget(uri, bucket, limit, currentpage){ 
        let time0 = performance.now();
        fetch(uri)
        .then((response)=> {if(response.ok){ return response.json() } else {throw new Error("[!response.ok]")} })
        .then((response)=>{
            bucket.timeF = (performance.now() - time0).toFixed(2);  
            bucket.rows = response.rows;
            bucket.pagination = paginate(response.total, currentpage, limit, 10);//(number of filtered rows, current page, per page, max pages)
          })
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
          body: body //setting "Content-Type":"multipart/form-data" throws "Multipart: Boundary not found" error
          //body: JSON.stringify(body), headers: {"Content-Type":"application/json"} //if data send as JSON not as FormData (no photos)
          })
        .then((response)=> {return response.json()})
        .then((response)=>{
                const rowToInsert = {"id":response.newId, "_id":response.newId, "photo":response.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get 
                // const id = response.id?response.id:response; //json-Server responds with an object
                bucket.rows.unshift(rowToInsert);
                if(bucket.rows.length>limit){bucket.rows.pop();} //remove last row in <table> (respect _limit after add)
              })
      },

      fput(uri, body, i, bucket){
        fetch(uri, {
            method: 'PUT',
            body: body
            //body: JSON.stringify(body), headers: {"Content-Type":"application/json"} //if data send as JSON not as FormData (no photos)
        })
        .then((response)=> {return response.json()})
        .then((response)=> {
          bucket.rows[i].name=body.get('name'); bucket.rows[i].age=body.get('age');bucket.rows[i].photo=response.photo;
        })
      },

      fdelete(url, lastTableId, bucket){
        fetch(url+'?lasttableid='+lastTableId, {method: "DELETE"})
        .then((response)=>{return response.json()})
        .then((response)=>{
          //GET replacement row
          if(response.length>0)
          { bucket.rows.push({"id":response[0].id, "_id":response[0]._id, "name":response[0].name, "age":response[0].age, "photo":response[0].photo}) }
          // else if(db=='jsonserver')
          // {
          // axios.get('http://localhost:3000/Resource1?id_lte='+ lastTableId +'&id_ne='+ lastTableId +'&_limit=1&_sort=id&_order=desc')
          //   .then((response)=>{
          //     if(response.data.length>0)
          //     { bucket.rows.push({"id":response.data[0].id, "name":response.data[0].name, "age":response.data[0].age, "photo":response.data[0].photo}); }
          //   })
          // }
        })
      }
  }
}
</script>