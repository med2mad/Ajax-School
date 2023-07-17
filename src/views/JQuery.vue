<template>
  <Showresult title="JQuery" :fget="fget" :fgetw="fgetw" :fpost="fpost" :fdelete="fdelete" :fput="fput">
      <template v-slot:comment>//Require installing "Cors" on the server side using CLI [npm i cors]</template>
  </Showresult>
</template>

<script>
import $ from "jquery";
export default {
  methods: {
      fget(uri, bucket){ 
        $.ajax({url:uri , method:'GET', dataType:'json'})
          .done(function(response){ bucket.t = response; });
      },
      fgetw(uri){

      let r =  $.ajax({url:uri, async: false , method:'GET', dataType:'json'});
      
          return r;
         // .done(function(response){ return response; });

      },

      fpost(uri, body){
$.ajax({type:'post', url: uri+'?callback=?', contentType: "application/json", data: JSON.stringify(body)})
.done( function(response){ console.log(response); } );
      },

      fput(uri, body){
$.ajax({type:'put', url: uri+'?callback=?', contentType: "application/json", data: JSON.stringify(body)})
.done( function(response){ console.log(response); } );
      },
      
      fdelete(uri){

$.ajax({type:'delete', url: uri+'?callback=?'}).done( function(response){ console.log(response); } );

      }
  }
}
</script>