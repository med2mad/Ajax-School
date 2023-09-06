<template>

  <div class="homelogo"> <router-link to="/"><img src="logo.png" alt="logo"></router-link> </div>

  <h1>Welcome</h1>

  <div class="home">

    <div class="start">

      <p>Welcome to "AJAX Paradise".</p>

      <p>
        AJAX, is a web developpement technique used to send requests to web servers Asynchronously using javascript 
        (and XML but no one does any more, we use JSON instead).
      </p>

      <p>
        This web site's goal is to show off my technical skills by comparing AJAX technique tools on different database systems, 
        by calculating the time it took for each one of them to receive and send data (which can also help you pick the best database system for your project).
        <br>
        The app also shows my frontend skills in web developpement (UI/styling/animations).
      </p>

      <p>Please enjoy!</p>

      <p class="btn">
          <router-link to="/axios">Start</router-link>
      </p>

    </div>

    <div class="tools">
      <p>These are the tools that were used to make this app:</p>
      <div class="carousel">
        <div><button @click="fl">button</button></div>
        <div>
          <transition :name="transName">
            <img v-if="tools[tooli] == tools[0]" :src="'tools\\'+tools[0]" alt="">
            <img v-else-if="tools[tooli] == tools[1]" :src="'tools\\'+tools[1]" alt="">
            <img v-else-if="tools[tooli] == tools[2]" :src="'tools\\'+tools[2]" alt="">
            <img v-else-if="tools[tooli] == tools[3]" :src="'tools\\'+tools[3]" alt="">
            <img v-else-if="tools[tooli] == tools[4]" :src="'tools\\'+tools[4]" alt="">
            <img v-else-if="tools[tooli] == tools[5]" :src="'tools\\'+tools[5]" alt="">
            <img v-else-if="tools[tooli] == tools[6]" :src="'tools\\'+tools[6]" alt="">
            <img v-else-if="tools[tooli] == tools[7]" :src="'tools\\'+tools[7]" alt="">
            <img v-else-if="tools[tooli] == tools[8]" :src="'tools\\'+tools[8]" alt="">
            <img v-else :src="'tools\\'+tools[9]" alt="">
          </transition>
        </div>
        <div><button @click="fr">button</button></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  
  data(){return{
              tools:[
                      'vuejs.png', 'nodejs.png', 
                      'mysql.png', 'mongodb.png', 'postgresql.png', 'jsonserver.png', 
                      'axios.png', 'fetch.jpg', 'jquery.png', 'xhr.png', 
                    ],
              tooli:0,
              transName:'techR',
              }
          },

    methods:{
      fr(){
          this.transName='techR';
          if(this.tooli<this.tools.length-1) {
            this.tooli++;
          }else{
            this.tooli=0
          }
      },
      fl(){
          this.transName='techL';
          if(this.tooli>0) {
            this.tooli--;
          }else{
            this.tooli=this.tools.length-1
          }
      },
    }
}
</script>

<style>

.home{
  display: flex; /* align .start|.tools */
  flex-wrap: wrap;
  justify-content: center;
}

.homelogo {
  padding: 10px 0px;
  background-color:black;
  border-radius: 30px;
  border: solid 8px #2c3e50; 
  width:30%;
  margin: auto;
}

.homelogo img{
  background-image: linear-gradient(180deg , rgb(133, 133, 133) , white  ) ;
  border-radius: 20px;
  width:90%;
}

.start{
   flex:1; 
}

.start .btn a{
padding: 20px 100px;
background-color: blue;
color: white;
font-weight: bold;
border-radius: 5px;
text-decoration: none;

}

.tools{
   flex:2; 
}

.tools .carousel{
  display: flex;
  align-items: center; 
}
.tools .carousel  ,  .tools .carousel img{
  width: 300px;
  height: 300px;
  margin: auto;
}

/*-------------- animate carosel (using classes)-------------*/
  .techR-leave-from{
    transform: translateX(0); opacity: 1;
  }
  .techR-leave-to{
    transform: translateX(-100%); opacity: 0;
  }
  .techR-leave-active{
    transition-property:transform, opacity;
    transition-duration: 250ms;
    position: absolute;
  }
  .techR-enter-from{
    transform: translateX(100%); opacity: 0;
  }
  .techR-enter-to{
    transform: translateX(0); opacity: 1;
  }
  .techR-enter-active{
    transition-property:transform, opacity;
    transition-duration: 250ms;
  }

  .techL-leave-from{
    transform: translateX(0%); opacity: 1;
  }
  .techL-leave-to{
    transform: translateX(100%); opacity: 0;
  }
  .techL-leave-active{
    transition-property:transform, opacity;
    transition-duration: 250ms;
    position: absolute;
  }
  .techL-enter-from{
    transform: translateX(-100%); opacity: 0;
  }
  .techL-enter-to{
    transform: translateX(0%); opacity: 1;
  }
  .techL-enter-active{
    transition-property:transform, opacity;
    transition-duration: 250ms;
  }
</style>