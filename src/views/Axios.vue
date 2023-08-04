<template>
  <Showresult title="Axios" :fget="fget" :fgetw="fgetw" :fpost="fpost" :fput="fput" :fdelete="fdelete">
      <template v-slot:comment>//Requires installing "axios" module in the client side (using CDN link or installing throught CLI [npm])</template>
  </Showresult>
</template>

<script>
import axios from "axios";
export default {
  methods: {
      fget(uri, bucket){ 
        axios.get(uri)
        .then((response)=>{bucket.a = response.data; })
        .catch((err)=>{bucket.a = 'err: ' + err.message})
      },
      async fgetw(uri){
        try {
          const response = await axios.get(uri)
          return response.data
        }
        catch(err) {return 'err: ' + err.message}
      },
      
      fpost(uri, body, bucket){
         axios.post(uri,body)
        .then((response) => {bucket.a.unshift({"id":response.data.insertId, "name":body.name, "age":body.age, "photo":body.photo});})
        .catch((err) => {console.error(err.message)})
      },

      fput(uri, body){
        axios.put(uri, body)
          .then((response) => {console.log(response.data);})
          .catch((err) => {console.error(err);});
      },

      fdelete(uri){
        axios.delete(uri)
        .then((response)=>{console.log(response.data);})
        .catch((err)=>{console.error(err.message)})
      },

      refreshAdd(userId, vname, vage, newFileName, bucket){



            // let x = '<tr :class="{selected:'+userId+'==selectedId}" :key="'+userId+'" @click="selectUser('+userId+');">';
            // let x = '<td v-if="!fake"> <input type="radio" name="db" v-model="selectedId" :value="'+userId+'"> </td>';
            // x += '<td>{{i+1}}</td><td>'+userId+'</td> <td :ref="' + "'name'" + '+'+userId+'">'+name+'</td> <td :ref="'+"'age'"+'+'+userId+'" v-if="!fake">'+age+'</td><td :ref="'+"'photo'"+'+'+userId+'" v-if="!fake">'+photo+'</td>';
            // x += '</tr>';

// let el = document.createElement('tr');
// el.setAttribute(':class', '{selected:'+userId+'==selectedId}');
// el.setAttribute(':key', userId);
// el.setAttribute('v-on:click', 'selectUser('+userId+');');
// el.innerHTML=x;
            // let newTr = document.createElement("tr");   
            // newTr.innerHTML=x;

            // let newTd = document.createElement("td");
            // let newTdName = document.createElement("tdName");
            // newTdName.innerHTML="";
            // newTr.append(newTdName);newTr.append(newTd);newTr.append(newTd);newTr.append(newTd);newTr.append(newTd);newTr.append(newTd);
            // let tr = document.getElementById("tr1");
            // let tbl = document.getElementById("tblMysql");

            // tbl.insertBefore(el, tr.nextSibling);


// document.getElementsByTagName('tbody')[0].append(x);

      }
  }
}
</script>