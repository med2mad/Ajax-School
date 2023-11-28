<template>
  <Showresult :fget="fget" :fgetw="fgetw" :fpost="fpost" :fdelete="fdelete" :fput="fput" />
</template>

<script>
export default {
  methods: {
      fget(uri, bucket){ 
        let time0 = performance.now();
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
        if (xhr.status===200){
                            bucket.timeF = (performance.now() - time0).toFixed(2);  
                            bucket.a = JSON.parse(xhr.responseText);
                            }
        }
        xhr.open("GET", uri, true);
        xhr.send();
      },
      fgetw(uri){ 
        //sorry! sync XHR not allowed any more (XMLHttpRequest and JQuery both use it)
        //freezes browser and throws warning "synchronous xmlhttprequest on the main thread is deprecated")
        
        // let r; //cannot return directly (for some reason !!!)
        // const xhr = new XMLHttpRequest();
        // xhr.onload=function(){
        // if (xhr.status===200){
        //     r=JSON.parse(xhr.responseText); 
        //     }
        // }
        // xhr.open("GET", uri, false);
        // xhr.send();
        return false;// return r;
      },

      fpost(uri, body, bucket, limit){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
          const response = JSON.parse(xhr.responseText);
          bucket.a.unshift({"id":response.newId, "_id":response.newId, "photo":response.photo, "name":body.get("name"), "age":body.get("age")});//FormData object use get
          if(bucket.a.length>limit){bucket.a.pop();} //remove last row in <table> (respect _limit after add)
        }
        xhr.open("POST", uri, true);
        //xhr.setRequestHeader('Content-Type', 'multipart/form-data');//throws "Multipart: Boundary not found" error
        xhr.send(body);

        //using JSON data (no FormData = no photos)
        // xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.send(JSON.stringify(body));
      },

      fput(uri, body, i, bucket){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
          const response = JSON.parse(xhr.responseText);
          bucket.a[i].photo=response.photo; bucket.a[i].name=body.get('name'); bucket.a[i].age=body.get('age');
        }
        xhr.open("PUT", uri, true);
        // xhr.setRequestHeader('Content-Type', 'multipart/form-data');//throws "Multipart: Boundary not found" error
        xhr.send(body);

        //using JSON data (no FormData = no photos)
        // xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.send(JSON.stringify(body));
      },
      
      fdelete(uri, lastTableId, bucket){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
          const response = JSON.parse(xhr.responseText);
          if(response.length>0)
          { bucket.a.push({"id":response[0].id, "_id":response[0]._id, "name":response[0].name, "age":response[0].age, "photo":response[0].photo}) }
        }
        xhr.open("DELETE", uri+'?lasttableid='+lastTableId, true);
        xhr.send();
      }
  }
}
</script>