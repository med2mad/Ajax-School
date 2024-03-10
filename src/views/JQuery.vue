<template>
  <Showresult :fget="fget" :fgetw="fgetw" :fpost="fpost" :fdelete="fdelete" :fput="fput" />
</template>

<script>
import $ from "jquery";
import { paginate } from '../../scripts';

export default {
  methods: {
      fget(uri, bucket, limit, currentpage){ 
        $.ajax({url:uri , method:'GET', dataType:'json'})
          .done(function(response, textStatus, jqXHR){
              bucket.time = jqXHR.getResponseHeader('X-Response-Time');
              bucket.rows = response.rows;
              bucket.pagination = paginate(response.total, currentpage, limit, 10);//(number of filtered rows, current page, per page, max pages)
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
            }
          )
        .done(function(response){
              const rowToInsert = {"id":response.newId, "_id":response.newId, "photo":response.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get
              bucket.rows.unshift(rowToInsert);
              if(bucket.rows.length>limit){bucket.rows.pop();} //remove last row in <table> (respect _limit after add)
        });
      },

      fput(uri, body, i, bucket){
        $.ajax(
            {
              type:'put', 
              url:uri, 
              data:body,
            }
          )
        .done( function(response){
            bucket.rows[i].name=body.get('name'); bucket.rows[i].age=body.get('age'); bucket.rows[i].photo=response.photo;
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
          { bucket.rows.push({"id":response[0].id, "_id":response[0]._id, "name":response[0].name, "age":response[0].age, "photo":response[0].photo}) }
        });
      }
  },

  mounted(){
    $.ajaxSetup({contentType:false, processData:false,});

    //setting "Content-Type":"multipart/form-data" throws "Multipart: Boundary not found" error

    //using JSON data (no FormData = no photos)
    // contentType:"application/json", 
    // url:uri+'?callback=?', 
    // data:JSON.stringify(body)
  },
}
</script>