import $ from "jquery";
import { paginate } from '../scripts';

function fget(uri, bucket, limit, currentpage){
        bucket.snippet = `$.ajax({url:${uri} , method:'GET', dataType:'json'}).done(function(response, textStatus, jqXHR){const data = response})`;

        $.ajax({url:uri , method:'GET', dataType:'json'})
          .done(function(response, textStatus, jqXHR){
              bucket.time = jqXHR.getResponseHeader('X-Response-Time') || 'Unavailable';
              bucket.rows = response.rows;
              bucket.pagination = paginate(response.total, currentpage, limit, 10);//(number of filtered rows, current page, per page, max pages)
            });
      }

function fpost(uri, body, bucket, limit){
        $.ajax(
            {
              type:'POST',
              contentType: false,
              processData: false,
              url:uri,
              data: body,
            }
          )
        .done(function(response){
              const rowToInsert = {"id":response.newId, "_id":response.newId, "photo":response.photo, "name":body.get("name"), "age":body.get("age")};//FormData object use get
              bucket.rows.unshift(rowToInsert);
              if(bucket.rows.length>limit){bucket.rows.pop();} //remove last row in <table> (respect _limit after add)
        });
      }

function fput(method, uri, body, selectedTr, bucket){
        console.log('put jquery');
        $.ajax(
            {
              "type":method, 
              "url":uri, 
              "data":body,
            }
          )
        .done( function(response){
            bucket.rows[selectedTr].name=body.get('name'); bucket.rows[selectedTr].age=body.get('age'); bucket.rows[selectedTr].photo=response.photo;
        });
      }
      
function fdelete(method, uri, bucket){
        $.ajax(
            {
            "type":method, 
            "url":uri

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


 function  fixHeader(){
    // $.ajaxSetup({contentType:false, processData:false,});
  }

  export default {fget, fpost, fput, fdelete}