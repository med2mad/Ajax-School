<template>
  <Showresult :fget="fget" :fgetw="fgetw" :fpost="fpost" :fdelete="fdelete" :fput="fput" />
</template>

<script>
import $ from "jquery";
export default {
  methods: {
      fget(uri, bucket){ 
        let time0 = performance.now();
        $.ajax({url:uri , method:'GET', dataType:'json'})
          .done(function(response){ 
                          bucket.timeF = (performance.now() - time0).toFixed(2);  
                          bucket.a = response; 
                          });
      },
      fgetw(uri){
        //sorry! sync XHR not allowed any more (XMLHttpRequest and JQuery both use it)
        //freezes browser and throws warning "synchronous xmlhttprequest on the main thread is deprecated")
        
        // let r =  $.ajax({url:uri, async: false , method:'GET', dataType:'json'});
        return false;// return r;
      },

      fpost(uri, body, bucket, limit){
        $.ajax(
            {
            type:'post',
            url:uri,
            data: body,
            processData: false,
            contentType: false //setting "Content-Type":"multipart/form-data" throws "Multipart: Boundary not found" error

            //using JSON data (no FormData = no photos)
            // url:uri+'?callback=?',
            // contentType:"application/json",
            // data:JSON.stringify(body)
            }
          )
        .done(function(response){
              const rowToInsert = {"id":response.id, "_id":response.id, "photo":response.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get
              bucket.a.unshift(rowToInsert);
              if(bucket.a.length>limit){bucket.a.pop();} //remove last row in <table> (respect _limit after add)
        });
      },

      fput(uri, body, i, bucket){
        $.ajax(
            {
            type:'put', 
            url:uri, 
            data:body,
            processData: false,
            contentType: false //setting "Content-Type":"multipart/form-data" throws "Multipart: Boundary not found" error

            //using JSON data (no FormData = no photos)
            // url:uri+'?callback=?', 
            // contentType:"application/json", 
            // data:JSON.stringify(body)
            }
          )
        .done( function(response){
            bucket.a[i].name=body.get('name'); bucket.a[i].age=body.get('age'); bucket.a[i].photo=response.photo;
        });
      },
      
      fdelete(uri, lastTableId, bucket){
        $.ajax(
            {
            type:'delete', 
            url:uri+'?lasttableid='+lastTableId

            //using JSON data (no FormData = no photos)
            // url:uri+'?callback=?'
            }
          )
        .done( function(response){
          //GET replacement row
          if(response.length>0)
          { bucket.a.push({"id":response[0].id, "_id":response[0]._id, "name":response[0].name, "age":response[0].age, "photo":response[0].photo}) }
        });
      }
  }
}
</script>