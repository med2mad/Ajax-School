<template> <div style="margin-top:200px"></div>

    <form method="POST" action="http://localhost:5010/sub/149?_limit=10&_age=77" enctype="multipart/form-data" >
        <input type="text" name="name" v-model="vname"><br>
        <input type="text" name="age" v-model="vage"><br>
        <input type="file" name="photo" ><br>
        <button type="submit">ok</button>
    </form>
 
</template>

<script>
import axios from "axios";
export default {

  data(){return{
              vname:'', vage:'',
            }},

  methods: {
      f(e){
        e.preventDefault();
        axios.post("http://localhost:5010/sub/149?_limit=10&_age=77",{"name":this.vname})
        .then((response) => {
                
                })
        .catch((err) => {console.error(err.message)})
      },
  }
}
</script>