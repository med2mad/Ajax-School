<template>
  <Showresult title="XHR" :fget="fget" :fgetw="fgetw" :fpost="fpost" :fdelete="fdelete" :fput="fput">
      <template v-slot:comment>//Require installing "Cors" on the server side using CLI [npm i cors]</template>
  </Showresult>
</template>

<script>
export default {
  methods: {
      fget(uri, bucket,p){ 
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
        if (xhr.status===200){
            bucket[p] = JSON.parse(xhr.responseText);
            }
        }
        xhr.open("GET", uri, true);
        xhr.send();
      },
      fgetw(uri,bucket,p){
        return "Can't use Await !!"
      },

      fpost(uri, body){
        const xhr = new XMLHttpRequest();
        xhr.onload=function(){
        if (xhr.status===200){
            console.log("inserted"); 
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