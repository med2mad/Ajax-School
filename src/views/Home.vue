<template>
  <div class="homelogo"><img src="logo.png" alt="logo"></div>

  <h1>- Welcome -</h1>

  <div class="home">

    <div class="start">
      <div class="ps">
        <p>
          "AJAX", A web developpement technique used to send requests to web servers Asynchronously using javascript 
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
          <router-link to="/axios"><div class="text">Start</div></router-link><div class="flash"></div>
      </div>
    </div>
    
    <div class="tools">
      <p>Tools used to make this app:</p>
      <div class="carousel">
        <img class="crslbtn prevbtn" src="prev.png" @click="prev" alt="button prev">
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
        <img class="nextbtn crslbtn" src="next.png" @click="next" alt="button next">
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

<style>
@font-face {
    font-family: Rajdhani-Light;
    src: url('C:\Users\MED\Desktop\AJAX Paradise\public\fonts\Rajdhani-Light.ttf');
}
@font-face {
    font-family: Rajdhani-Bold;
    src: url('C:\Users\MED\Desktop\AJAX Paradise\public\fonts\Rajdhani-Bold.ttf');
}

.homelogo{
  padding: 10px 0px;
  background-color: black;
  border-radius: 30px;
  border: solid 8px #2c3e50; 
  width: 30%;
  margin: 5px auto;
  min-width: 300px;
}

.homelogo img{
  background-image: linear-gradient(180deg, rgb(206, 206, 206), white);
  border-radius: 20px;
  width: 90%;
}

.home{
  display: flex; /*align .start|.tools*/
  flex-wrap: wrap;
  gap:10px;
}

h1{
  font-size: 50px;
  margin: 20px;
  margin-bottom: 15px;
  font-family: Rajdhani-Light, sans-serif;
}

.start{
  flex: 1;
}

p{
margin-bottom: 20px;
text-align: left;
padding-left: 10px;
line-height: 1.3rem;
font-family: Rajdhani-Light, sans-serif;
font-weight: bold;
font-size: 1.2rem;
}

.start .btn{
  width: 200px;
  margin: auto;
  position: relative; /*position .flash*/
  transition: transform 250ms;
  overflow: hidden;
  margin-top: 10px;
  font-family: Rajdhani-Light, sans-serif;
  border-radius: 20px;
}
.start .btn a{
  text-decoration: none;
}
.start .btn a .text{
  font-size: 1.5rem;
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
.tools p{
  text-align: center;
  font-family: Rajdhani-Bold, sans-serif;
  font-size: 1.5rem;
}
.tools .carousel{
  justify-content: center;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  position: relative;
  height:50%;
}
.tools .carousel img{
  width:50%;
}
.tools .carousel .crslbtn{
  position: absolute;
  width: 20%;
}
.tools .carousel .prevbtn{
  left:10px;
  z-index: 1; /* slides go on prev button while sliding */
}
.tools .carousel .nextbtn{
  right:10px;
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
/*---------------------media query-------------------------*/
@media only screen and (max-width: 650px){
  .home{
    flex-direction: column-reverse;
  }
  .start .ps{
    display: none;
  }
  .tools .carousel{
    height: 100px;
  }
}
</style>