<template>
    <!-- <Vbackpopup v-if="backpopup" @close="(popV)=>{vback=popV; backpopup=false;}"/> -->
    <header>
        <img src="imgs/hamburger-button.png" alt="hamburger-button back-end" class="hamburger-button" @click="backpopup=true;">

        <div class="logo"><router-link to="/"><img src="imgs/logo.png" alt="logo"></router-link></div> 
        
        <Login ref="login" />

        <p>Ajax tool</p>

        <nav>
            <router-link to="/xhr"> <div class="btn">XHR</div> </router-link>
            <router-link to="/jquery"> <div class="btn">JQuery</div> </router-link>
            <router-link to="/fetch"> <div class="btn">Fetch</div> </router-link>
            <router-link to="/axios"> <div class="btn">Axios</div> </router-link>
        </nav>
    </header>

    <div class="side">
        <h2>Back-end :</h2>
        <div>
            <select v-model="vback" @change="changeBack">
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
        <DB v-for="item in DBs" :key="item._db+vback+vlimit+vname+vage" :back="vback" :_dblogofile="item._dblogofile" :_db="item._db" @logout="this.$refs.login.fLogout();"
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

export default{

    props: {fpost:Function, 
            fput:Function, fdelete:Function,
            fget:Function, fgetw:Function, 
            },

    components: {Login},

    data(){return{
                vback:localStorage.getItem('back'), vname:'', vage:'', vlimit:10,
                backpopup:false, 
                DBs:[
                    {_db:'mysql', _dblogofile:'mysql.png', _url:{'js':'http://localhost:5010/mysql/', 'php':'http://127.0.0.1:8000/MysqlModel/'} },
                    {_db:'mongoose', _dblogofile:'mongodb.png', _url:{'js':'http://localhost:5020/mongoose/','php':'http://127.0.0.1:8000/MongoModel/'} },
                    {_db:'postgresql', _dblogofile:'postgresql.png', _url:{'js':'http://localhost:5030/postgresql/', 'php':'http://127.0.0.1:8000/PostgreSQLModel/'} },
                    //https://node-backend-812w.onrender.com
                    // {_db:'mysql', _dblogofile:'mysql.png', _url:{'js':'https://super-seahorse-f7bc86.netlify.app.com/mysql/', 'php':'http://127.0.0.1:8000/MysqlModel/'} },
                    // {_db:'mongoose', _dblogofile:'mongodb.png', _url:{'js':'https://super-seahorse-f7bc86.netlify.app/mongoose/','php':'http://127.0.0.1:8000/MongoModel/'} },
                    // {_db:'postgresql', _dblogofile:'postgresql.png', _url:{'js':'https://super-seahorse-f7bc86.netlify.app/postgresql/', 'php':'http://127.0.0.1:8000/PostgreSQLModel/'} },
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
        changeBack(event){
            localStorage.setItem('back', event.target.value);
        }
    }
}
</script>

<style>
    @import 'C:\Users\MED\Desktop\AJAX Paradise\public\styles\showresult.css';
</style>