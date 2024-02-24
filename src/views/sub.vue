<template> <div style="margin-top:200px"></div>
  <form @submit="sub" ref="frmsub" method="POST" action="http://localhost:5010/mysql/sub/" enctype="multipart/form-data" >
  <!-- <form method="POST" action="http://127.0.0.1:8000/MysqlModel/"> -->
      <input type="text" name="name" v-model="vname"> <br>
      <!-- <input type="text" name="age" v-model="vage"> <br> -->
      <input type="text" name="pass" v-model="vage"> <br>
      <input type="file" name="photo" @change="onFileChange"> <br>
      <button type="submit">Sign Up</button>
  </form><br><br>

  <form @submit="login" ref="frmlogin" >
      <input type="text" name="name"> <br>
      <input type="text" name="pass"> <br>
      <button type="submit">Log In</button>
  </form><br><br>

  <div>
      <button @click="action">Action</button>
  </div><br><br>
  
  <div>
    <button @click="logout">Log Out</button>
  </div>
</template>

<script> //add @submit="f" to <form> to use AJAX , otherwise you can remove <script>
import axios from "axios";

export default {

  data(){return{
              vname:'', vage:'', photoObject:null,
            }},

  methods: {
    sub(e){
      e.preventDefault();
      
      ////Json text body (no files)
      // const payload = {"name":this.vname, "age":this.vage, "photo":this.photoObject.name};

      ////Json text body (no files)
      // const str = `{"name":"${this.vname}", "age":"${this.vage}", "photo":"${this.photoObject.name}"}`;
      // const payload = JSON.parse(str);

      ////Json text body (no files)
      // const fd = new FormData(this.$refs.frmsub);
      // const payload = new URLSearchParams(fd); //No need for headers

      ////form body (supports file)
      const payload = new FormData(this.$refs.frmsub);
      
      //// form body (supports file)
      // const payload = new FormData();
      // payload.append("name",this.vname);
      // payload.append("age",this.vage);
      // payload.append("photo", this.photoObject, this.photoObject.name);

      axios.post("http://localhost:5010/mysql/sub", payload)
      .then((response) => {})
    },

    login(e){
      e.preventDefault();
      const payload = new FormData(this.$refs.frmlogin);

      axios.post("http://localhost:5010/mysql/login/", payload)
      .then((response) => {localStorage.setItem('token', response.data.token);})
    },
    
    action(){
      const token = localStorage.getItem('token');

      axios.post("http://localhost:5010/mysql/action/", {"token":token})
      .then((response) => {})
    },

    logout(){
      localStorage.removeItem('token');
    },

    onFileChange(e){
      if (e.target.files[0]) {
          this.photoObject = e.target.files[0];
      }
    },

  }
}
</script>