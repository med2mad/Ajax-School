<template>
  <div class="homelogo"><img src="imgs/logo.png" alt="logo"></div>

  <div class="home">
    <div class="start">
      <div>
        <p>
          A code builder making queries and Ajax code snipppets. The app supports multiple database systems,
          and allows the use of different backend technologies with a selection of various Ajax APIs.
          Also includes a tutorial with challenges to start off quickly.
        </p>
      </div>
      <div class="btn">
          <router-link to="/Showresult"><div class="text">Start</div></router-link>
          <div class="flash"></div>
      </div>
    </div>
    
    <div class="devider"></div>

    <div class="tools">
      <p>Build using :</p>
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