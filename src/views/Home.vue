<template>
  <div class="homelogo"><img src="imgs/logo.png" alt="logo"></div>

  <h1><span>-</span> Welcome <span>-</span></h1>

  <div class="home">

    <div class="start">
      <div class="ps">
        <p>
          "AJAX", a web developpement technique used to send requests to web servers Asynchronously using javascript.
        </p>
        <p>
          This app's goal is to show off my technical skills by comparing AJAX tools on different database systems 
          by calculating the time it takes for each of them to send and receive data (which can help you pick the right database system for your projects).
        </p>
        <p>
          The app also shows my Front-End capabilities (UI/Styling/Animations).
        </p>
      </div>
      <div class="btn">
          <router-link to="/Showresult"><div class="text">Start</div></router-link>
          <div class="flash"></div>
      </div>
      <div class="btn">
          <router-link to="/Calendar"><div class="text">calendar</div></router-link>
          <div class="flash"></div>
      </div>
    </div>
    
    <div class="tools">
      <p>Tools used to make this app:</p>
      <div class="carousel">
        <img class="crslbtn prevbtn" src="imgs/prev.png" @click="prev" alt="button prev">
        <transition :name="transName">
          <img v-if="tools[tooli] == tools[0]" :src="'imgs/tools/'+tools[0]" alt="">
          <img v-else-if="tools[tooli] == tools[1]" :src="'imgs/tools/'+tools[1]" alt="">
          <img v-else-if="tools[tooli] == tools[2]" :src="'imgs/tools/'+tools[2]" alt="">
          <img v-else-if="tools[tooli] == tools[3]" :src="'imgs/tools/'+tools[3]" alt="">
          <img v-else-if="tools[tooli] == tools[4]" :src="'imgs/tools/'+tools[4]" alt="">
          <img v-else-if="tools[tooli] == tools[5]" :src="'imgs/tools/'+tools[5]" alt="">
          <img v-else-if="tools[tooli] == tools[6]" :src="'imgs/tools/'+tools[6]" alt="">
          <img v-else-if="tools[tooli] == tools[7]" :src="'imgs/tools/'+tools[7]" alt="">
          <img v-else-if="tools[tooli] == tools[8]" :src="'imgs/tools/'+tools[8]" alt="">
          <img v-else :src="'tools/'+tools[9]" alt="">
        </transition>
        <img class="crslbtn nextbtn" src="imgs/next.png" @click="next" alt="button next">
      </div>
    </div>

  </div>
  
</template>

<script>
import '/public/styles/home.css';

export default {
  
  data(){return{
              tools:[
                      'vuejs.png', 'nodejs.png', 'laravel.png',
                      'mysql.png', 'mongodb.png', 'postgresql.png',
                      'sequelize.png', 'mongoose.png', 'eloquent.png',
                    ],
              tooli:0,
              transName:'next', SIreturn:null,
              }
          },

    methods:{
      next(){
          this.transName='next';
          this.startAutoSlide() //restart timer after each manual next/prev
          if(this.tooli<this.tools.length-1) {
            this.tooli++;
          }else{
            this.tooli=0
          }
      },
      prev(){
          this.transName='prev';
          this.startAutoSlide() //restart timer after each manual next/prev
          if(this.tooli>0) {
            this.tooli--;
          }else{
            this.tooli=this.tools.length-1
          }
      },      
      startAutoSlide(){
        clearInterval(this.SIreturn);
        this.SIreturn = setInterval(() => {
        this.next();
        }, 2500);
      },

    },

    mounted(){
      this.startAutoSlide();
    },
}
</script>