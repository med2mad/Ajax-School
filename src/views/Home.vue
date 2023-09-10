<template>

  <div class="homelogo"> <router-link to="/"><img src="logo.png" alt="logo"></router-link> </div>

  <h1>Welcome</h1>

  <div class="home">

    <div class="start">
      <div class="ps">
        <p class="enjoy">Welcome to "AJAX Paradise".</p>
        <p>
          "AJAX", A web developpement technique used to send requests to web servers Asynchronously using javascript 
          (and XML but no one does any more, we use JSON instead).
        </p>
        <p>
          This web site's goal is to show off my technical skills by comparing AJAX technique tools on different database systems 
          by calculating time it takes for each of them to send and receive data (which can help you pick the right database system for your projects).
        </p>
        <p>
          The app also shows my Front-End capabilities in web developpement (UI/Styling/Animations).
        </p>
      </div>
      <div class="btn">
          <router-link to="/axios"><div class="text">Start</div></router-link><div class="flash"></div>
      </div>
    </div>
 
    <div class="tools">
      <p class="enjoy">These are the tools that were used to make this app:</p>
      <div class="carousel">
        <button @click="prev" class="buttonPrev">&lt;</button>
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
        <button @click="next" class="buttonNext">&gt;</button>
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
              transName:'next',
              }
          },

    methods:{
      next(){
          this.transName='next';
          if(this.tooli<this.tools.length-1) {
            this.tooli++;
          }else{
            this.tooli=0
          }
      },
      prev(){
          this.transName='prev';
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
.homelogo{
  padding: 10px 0px;
  background-color: black;
  border-radius: 30px;
  border: solid 8px #2c3e50; 
  width: 30%;
  margin: auto;
}

.homelogo img{
  background-image: linear-gradient(180deg, rgb(206, 206, 206), white);
  border-radius: 20px;
  width: 90%;
}

.home{
  display: flex; /*align .start|.tools*/
  flex-wrap: wrap;
}

.start{
  flex: 1;
}


p.enjoy{
  margin-top:20px;
  margin-bottom:30px;
  font-weight: bold;
  text-decoration: underline;
}

.start .ps p{
  margin-bottom:20px;
}

.start .btn{
  width: 200px;
  margin: auto;
  position: relative; /*position .flash*/
  transition: transform 250ms;
  overflow: hidden;
}
.start .btn a{
  text-decoration: none;
}
.start .btn a .text{
  font-size: 1.2rem;
  background-color: blue;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  height: 50px;
  display: grid; place-content: center;
  transition: transform 250ms;
}
.start .btn .flash{
  background-image: linear-gradient(135deg , rgba(255, 255, 255, 0) , #ffffff 50%, rgba(255, 255, 255, 0));
  position: absolute;
  transform: rotateZ(45deg);
  top: -150px;
  left: -40px;
  width: 40px;
  height: 250px;
  transition: top 250ms, left 250ms ;
}
.start .btn:hover .flash{
  top: 100%;
  left:100%;
}
.start .btn:hover{
  transform: scale(150%, 150%);
}

.tools{
  flex:1;
  border-left: solid 1px;
}
.tools .carousel{
  justify-content: center;
  display: flex;
  
}
.tools .carousel img{
  width:50%;
}
/*-------------- animate carousel (using classes)-------------*/
  .next-leave-from{
    transform: translateX(0); opacity: 1;
  }
  .next-leave-to{
    transform: translateX(-100%); opacity: 0;
  }
  .next-leave-active{
    transition-property:transform, opacity;
    transition-duration: 250ms;
    position: absolute;
  }
  .next-enter-from{
    transform: translateX(100%); opacity: 0;
  }
  .next-enter-to{
    transform: translateX(0); opacity: 1;
  }
  .next-enter-active{
    transition-property:transform, opacity;
    transition-duration: 250ms;
  }

  .prev-leave-from{
    transform: translateX(0%); opacity: 1;
  }
  .prev-leave-to{
    transform: translateX(100%); opacity: 0;
  }
  .prev-leave-active{
    transition-property:transform, opacity;
    transition-duration: 250ms;
    position: absolute;
  }
  .prev-enter-from{
    transform: translateX(-100%); opacity: 0;
  }
  .prev-enter-to{
    transform: translateX(0%); opacity: 1;
  }
  .prev-enter-active{
    transition-property:transform, opacity;
    transition-duration: 250ms;
  }
</style>