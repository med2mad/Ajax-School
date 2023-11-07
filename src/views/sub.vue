<template> <div style="margin-top:200px"></div>

    <form ref="frmid" method="POST" @submit="f" action="http://localhost:5010/sub/149?_limit=10&_age=77" enctype="application/x-www-form-urlencoded"  >
        <input type="text" name="name" v-model="vname"> <br>
        <input type="text" name="age" v-model="vage"> <br>
        <button type="submit">ok</button>
    </form>
 
</template>

<script>
import axios from "axios";
export default {

  data(){return{
              vname:'', vage:'', photoObject:null,
            }},

  methods: {
    f(e){
      e.preventDefault();
      
      // const payload = {"name":this.vname, "age":this.vage, "photo":this.photoObject.name};

      const payload = new FormData(this.$refs.frmid);

      // const payload = new FormData();
      // payload.append("name",this.vname);
      // payload.append("age",this.vage);
      // payload.append("photo",this.photoObject);

      axios.post("http://localhost:5010/sub/149?_limit=10&_age=77", payload)
      .then((response) => {
            })
      .catch((err) => {console.error(err.message)})
    },


    onFileChange(e){
      if (e.target.files[0]) {
          this.photoObject = e.target.files[0];
      }
    }

  }
}
</script>