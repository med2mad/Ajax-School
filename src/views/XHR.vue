<template>
  <Showresult title="XHR" :fget="fget" :fgetw="fgetw" :fpost="fpost" :fdelete="fdelete" :fput="fput">
      <template v-slot:comment>//Require installing "Cors" on the server side using CLI [npm i cors]</template>
  </Showresult>
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

      fpost(uri, body){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
        if (xhr.status===200){
            console.log("Inserted"); //#TODO (auto insert row)
            }
        }
        xhr.open("POST", uri, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(body));
      },

      fput(uri, body){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
        if (xhr.status===200){
            console.log("Updated"); 
            }
        }
        xhr.open("PUT", uri, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(body));
      },
      
      fdelete(uri){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
        if (xhr.status===200){
            console.log("Deleted"); 
            }
        }
        xhr.open("DELETE", uri, true);
        xhr.send();
      }
  }
}
</script>