<template>

  <h1 ref="h1">Home</h1>

  <h2>Welcome</h2>
  <p>Welcome to "AJAX Heavens".</p>

  <p>This web site's goal is to show off my technical skills by using the excuse 
  of comparing some AJAX technique tools.
  <br>
  The web site also concentrates on bragging about styling skills 
  (looks and animations).
  <br>
  So in the end the web site has nothing 
  to do with anything, it's just a miserable try to impress the ladies (how sad!  -_-').
  </p>

  <p>
    <button @click="move">btn</button>
    So...amm......enjoy ^ ^ . <br>
  </p>

  <h2>What is What ?</h2>
  <p>AJAX, is a web developpement technique, to manipulate data asynchronously, using javascript (and XML but no one does any more, we use JSON instead).</p>
  <p>The app also calculates requests time (sync and async), which shows the diffrence in timing between the different dataBases.</p>
  <p>(note : the time calculation actually calculates the bloking/freezing time , not the actual request time, , which shows the superiority of the Asynchronous way)</p>

 <ul ref="ul">
      <li v-for="user in users" :ref="user" :key="user" @click="remove(user)">{{user}}</li>
</ul>

</template>


<script>
export default {
  data(){
    return{
      users:['user1','user2','user3','user4']
    }
  },

  methods:{
    remove(user){

      // this.users=this.users.filter(p=>p!==user);
this.$refs["ul"].style.fontSize ='5rem';
 
    },
    move(g){
      // this.$refs.li.style.fontSize ='5rem';
      // this.users.unshift('qlwkej');
    }
  }
}
</script>

<style >
li {
  transition:all 500ms;
}
</style>