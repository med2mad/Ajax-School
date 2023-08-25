<template>

  <div class="logo"> <router-link to="/"><img src="logo.png" alt="logo"></router-link> </div>

  <h1>Welcome</h1>

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
    So....amm......enjoy ^ ^ . <br>
        <router-link to="/xhr">XHR</router-link> |
        <router-link to="/jquery">JQuery</router-link> |
        <router-link to="/fetch">Fetch</router-link> |
        <router-link to="/axios">Axios</router-link>
  </p>

  <h1>What is What ?</h1>
  <p>AJAX, is a web developpement technique, to manipulate data asynchronously, using javascript (and XML but no one does any more, we use JSON instead).</p>
  <p>The app also calculates requests time (sync and async), which shows the diffrence in timing between the different dataBases.</p>
  <p>(note : the time calculation actually calculates the bloking/freezing time , not the actual request time, , which shows the superiority of the Asynchronous way)</p>
</template>

<style scoped>
.logo img{
  width:500px;
}
</style>