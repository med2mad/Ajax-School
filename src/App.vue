<template>

  <div><router-link to="/">Ajax Paradise</router-link></div>

  <nav>
    <router-link to="/xhr">XHR</router-link> |
    <router-link to="/jquery">JQuery</router-link> |
    <router-link to="/fetch">Fetch</router-link> |
    <router-link to="/axios">Axios</router-link>
  </nav>
  
  <router-view />

</template>

<style >
body{background-color: #eaf2fb;}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
padding: 30px;
}

nav a {
background-color: rgb(218, 218, 218);
font-weight: bold;
color: #2c3e50;
text-decoration: none;
cursor: hand;
padding: 15px;
border-radius: 10px;
}

nav a.router-link-exact-active {
background-color: #42b983;
color: white;
cursor: default;
}

</style>
