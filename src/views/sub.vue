<template> <div style="margin-top:200px"></div>

    <form ref="frmid" method="POST" action="http://localhost:5010/sub/ppp?name1&name2=&name3=" enctype="multipart/form-data" >
    <!-- <form method="POST" action="http://127.0.0.1:8000/"> -->
        <input type="text" name="name" v-model="vname"> <br>
        <input type="text" name="age" v-model="vage"> <br>
        <input type="file" name="photo" @change="onFileChange"> <br>
        <button type="submit">ok</button>
    </form>

</template>

<script> //add @submit="f" to <form> to use AJAX , otherwise you can remove <script>
import axios from "axios";
export default {

  data(){return{
              vname:'', vage:'', photoObject:null,
            }},

  methods: {
    f(e){
      e.preventDefault();
      
      ////Json text body (no files)
      // const payload = {"name":this.vname, "age":this.vage, "photo":this.photoObject.name};

      ////Json text body (no files)
      // const str = `{"name":"${this.vname}", "age":"${this.vage}", "photo":"${this.photoObject.name}"}`;
      // const payload = JSON.parse(str);

      ////Json text body (no files)
      // const fd = new FormData(this.$refs.frmid);
      // const payload = new URLSearchParams(fd); //No need for headers

      ////form body (supports file)
      const payload = new FormData(this.$refs.frmid);
    
      //// form body (supports file)
      // const payload = new FormData();
      // payload.append("name",this.vname);
      // payload.append("age",this.vage);
      // payload.append("photo", this.photoObject, this.photoObject.name);

      axios.post("http://localhost:5010/sub/149?_limit=10&_age=77", payload)
      .then((response) => {})
      .catch((err) => {console.error(err.message)})
    },

    onFileChange(e){
      if (e.target.files[0]) {
          this.photoObject = e.target.files[0];
      }
    },

  }
}
</script>