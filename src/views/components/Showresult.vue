<template>
    <Vbackpopup v-if="backpopup" @close="(popV)=>{vback=popV; backpopup=false;}"/>
    <header>
        <img src="imgs/hamburger-button.png" alt="hamburger-button back-end" class="hamburger-button" @click="backpopup=true;">

        <div class="logo"><router-link to="/"><img src="imgs/logo.png" alt="logo"></router-link></div> 
        
        <Login :userid="userid" :username="username" :userphoto="userphoto"
            @flogin="(url)=>{login(url)}" @flogout="userid=0; username=''; userphoto='';" />

        <p>Ajax tool</p>

        <nav>
            <!-- <router-link to="/sub"> <div class="btn">subscribe</div> </router-link> -->
            <router-link to="/xhr"> <div class="btn">XHR</div> </router-link>
            <router-link to="/jquery"> <div class="btn">JQuery</div> </router-link>
            <router-link to="/fetch"> <div class="btn">Fetch</div> </router-link>
            <router-link to="/axios"> <div class="btn">Axios</div> </router-link>
        </nav>
    </header>

    <div class="side">
        <h2>Back-end :</h2>
        <div>
            <select name="vback" v-model="vback" id="">
                <option value="js">Js-Express</option><option value="php">PHP-Laravel</option>
            </select>
        </div>
        
        <div class="devider"></div>

        <h2>Filter :</h2>
        <input type="text" v-model="vname" name="name" placeholder="Name" autocomplete="off" spellcheck="false"><br>
        <input type="number" v-model="vage" name="age" placeholder="Age" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'" >
        
        <div class="devider"></div>

        <h2>Per page :</h2>
        <input type="number" min="0" required class="limit" v-model="vlimit" name="limit" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'"><br>
        
        <div class="devider"></div>

        <h2>Legend :</h2>
        <div class="legend">
            <div><div class="green"></div></div><div>Under 100 ms</div>
            <div><div class="orange"></div></div><div>100 ms to 200 ms</div>
            <div><div class="red"></div></div><div>Above 200 ms</div>
        </div>
    </div>

    <main>
        <DB v-for="item in DBs" :key="item._db+vback+vlimit+vname+vage" :back="vback" :_dblogofile="item._dblogofile" :_db="item._db"
                            @mountGet="(bucket)=>{fget(getUri(item._url[vback],1), bucket, vlimit, 1);}" 
                            @mountGetPage="(bucket, page)=>{fget(getUri(item._url[vback], page), bucket, vlimit, page);}" 
                            @mountGetw="async(bucket)=>{bucket.rows = await fgetw(getUri(item._url[vback]));}" 
                            @clickPost="(body, bucket)=>{fpost(item._url[vback], body, bucket, vlimit);}" 
                            @clickPut="(method, selectedId, body, selectedTr, bucket)=>{fput(method, item._url[vback]+selectedId, body, selectedTr, bucket);}"
                            @clickDelete="(method, selectedId, lastTableId, bucket)=>{fdelete(method, getUri(item._url[vback]+selectedId)+lastTableId, bucket);}"
        ></DB>
    </main>

    <footer>
        <div class="footer1">
            <div class="span">Filter :</div>
            <div class="flex2">
            Name : <input type="text" v-model="vname" name="name" autocomplete="off" spellcheck="false"><br>
            Age : <input type="number" v-model="vage" name="age" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'" >
            </div>
        </div>
        <div class="footer2">
            <span class="span">Limit : </span>
            <input type="number" min="0" class="limit" required v-model="vlimit" name="limit" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'">
        </div>
    </footer>
    
</template>

<script>
import Login from './Login.vue';
import { flogin } from '../utils/auth';

export default{

    props: {fpost:Function, 
            fput:Function, fdelete:Function,
            fget:Function, fgetw:Function, 
            },

    components: {Login},

    emits: ['logout'],

    data(){return{
                vback:'js', vname:'', vage:'', vlimit:10,
                userid:0, username:'', userphoto:'',
                backpopup:false, 
                DBs:[
                    {_db:'mysql', _dblogofile:'mysql.png', _url:{'js':'http://localhost:5010/mysql/', 'php':'http://127.0.0.1:8000/MysqlModel/'} }, //CORS shit ("http://localhost/mysql.php" and not just "mysql.php")
                    {_db:'mongoose', _dblogofile:'mongodb.png', _url:{'js':'http://localhost:5020/mongoose/','php':'http://127.0.0.1:8000/MongoModel/'} },
                    {_db:'postgresql', _dblogofile:'postgresql.png', _url:{'js':'http://localhost:5030/postgresql/', 'php':'http://127.0.0.1:8000/PostgreSQLModel/'} },
                    // {_db:'jsonserver', _dblogofile:'jsonserver.png', _url:{'js':'http://localhost:3000/Resource1/', 'js':'http://localhost:3000/Resource1/','php':'http://localhost:3000/Resource1/'}, _idClmn:'id'}, //is not compatible with FormData (need json body)
                    // {_db:'file', _dblogofile:'Simple File', _url:'http://localhost:8080/j.json' /*(or [_url:'j.json'] because served links will add the current _url) */, _idClmn:'id'} //in the public folder. ( use: var o = JSON.parse(fs.readFileSync(filePath)); + fs.writeFileSync(path, JSON.stringify(o)) / var o = require(filePath); )
                    ]
                }
            },

    methods:{
        getUri(url, currentpage){
                url += '?_limit='+((Number.isInteger(this.vlimit)&&this.vlimit>=0)?this.vlimit:0);
                url += '&_skip='+((Number.isInteger(this.vlimit)&&this.vlimit>=0)?(currentpage-1)*this.vlimit:0);
                url += '&_name='+this.vname;
                if (Number.isInteger(this.vage)){url += '&_age='+this.vage;}
                
                return url;
            },

            async login(url){
                const user = await flogin(url);
                this.userid = user.id;
                this.username = user.name;
                this.userphoto = user.photo;
            },

        // burgerButton(){
        //     const bs = this.$refs.back.style;
        //     if (bs.display=="none") {
        //         bs.display="block";
        //         bs.position="absolute";
        //         bs.top="50px";
        //         bs.left="5px";
        //         bs.zIndex=100;
        //     }
        //     else{
        //         bs.display="none";
        //     }
        // }
    }
}
</script>

<style>
    @import 'C:\Users\MED\Desktop\AJAX Paradise\public\styles\showresult.css';
</style>