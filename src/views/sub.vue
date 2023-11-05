<template>
  <div style="margin-top:200px">
    <form method="GET" action="http://localhost:5010/sub/149?_limit=10&_age=77" @submit="fpost(e)"  enctype="multipart/form-data" >
        <input type="text" name="name" v-model="vname"><br>
        <input type="file" name="photo" ><br>
        
        <button type="submit">ok</button>
    </form>
  </div>
</template>


<script>
import axios from "axios";
export default {

  data(){return{
              vname:'', vphoto:''
            }},

  methods: {
      fpost(e){
        e.preventDefault();
        axios.post("http://localhost:5010/sub/149?_limit=10&_age=77",{"name":this.vname, "age":this.vphoto})
        .then((response) => {
                console.log(response);
                })
        .catch((err) => {console.error(err.message)})
      },
  }
}
</script>