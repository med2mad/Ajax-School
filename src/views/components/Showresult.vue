<template>
    <header>
        <div class="logo"><router-link to="/"><img src="imgs/logo.png" alt="logo"></router-link></div> 
        
        <Login ref="login" />

        <p>Ajax tool</p>

        <nav>
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

        <h2>Ajax :</h2>
        <div>
            <select v-model="vajax" @change="changeAjax">
                <option value="Axios">Axios</option><option value="Fetch">Fetch</option><option value="JQuery">JQuery</option><option value="XHR">XHR</option>
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
                        @mountGet="(bucket, page)=>{snippet += ffget(getUri(item._url[vback], page), bucket, vlimit, page);}" 
                        @clickPost="(body, bucket)=>{ffpost(item._url[vback], body, bucket, vlimit);}" 
                        @clickPut="(method, selectedId, body, selectedTr, bucket)=>{ffput(method, item._url[vback]+selectedId, body, selectedTr, bucket);}"
                        @clickDelete="(method, selectedId, lastTableId, bucket)=>{ffdelete(method, getUri(item._url[vback]+selectedId)+lastTableId, bucket);}"
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
    
    <img src="imgs/up.png" class="upbtn" alt="offcanvas trigger" @click="toggleOffCanvas('open')">
    <div class="offcanvas" ref="offcanvas">
        <button @click="toggleOffCanvas('close')">see offCanvas in bootstrap</button> <br>
        <p> <pre>{{ snippetbucket.snippet }}</pre> </p> 
    </div>
</template>

<script>
import DB from './DB.vue';
import Login from './Login.vue';
import axios from '../AJAX/Axios';
import fetch from '../AJAX/Fetch';
import jquery from '../AJAX/JQuery';
import xhr from '../AJAX/XHR';
import '/public/styles/showresult.css';

export default{

    components: {DB, Login},

    data(){return{
                vback:localStorage.getItem('back'), vajax:localStorage.getItem('ajax'),
                vname:'', vage:'', vlimit:10, snippetbucket:{snippet:''}, o:{'Axios':axios, 'Fetch':fetch, 'JQuery':jquery, 'XHR':xhr},
                DBs:[
                    {_db:'mysql', _dblogofile:'mysql.png', _url:{'js':'http://localhost:5010/mysql/', 'php':'http://127.0.0.1:8000/MysqlModel/'} },
                    {_db:'mongoose', _dblogofile:'mongodb.png', _url:{'js':'http://localhost:5020/mongoose/','php':'http://127.0.0.1:8000/MongoModel/'} },
                    {_db:'postgresql', _dblogofile:'postgresql.png', _url:{'js':'http://localhost:5030/postgresql/', 'php':'http://127.0.0.1:8000/PostgreSQLModel/'} },
                    
                    {_db:'mysql', _dblogofile:'mysql.png', _url:{'js':'https://d7b9-196-117-169-40.ngrok-free.app/mysql/', 'php':'http://127.0.0.1:8000/MysqlModel/'} },
                    {_db:'mongoose', _dblogofile:'mongodb.png', _url:{'js':'https://d7b9-196-117-169-40.ngrok-free.app/mongoose/','php':'http://127.0.0.1:8000/MongoModel/'} },
                    {_db:'postgresql', _dblogofile:'postgresql.png', _url:{'js':'https://d7b9-196-117-169-40.ngrok-free.app/postgresql/', 'php':'http://127.0.0.1:8000/PostgreSQLModel/'} },
                    
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
        ffget(uri, bucket, limit, page){
            return this.o[this.vajax].fget(uri, bucket, limit, page, this.snippetbucket);
        },
        ffpost(uri, body, bucket, limit){
            this.o[this.vajax].fpost(uri, body, bucket, limit);
        },
        ffput(method, uri, body, selectedTr, bucket){
            this.o[this.vajax].fput(method, uri, body, selectedTr, bucket);
        },
        ffdelete(method, uri, bucket){
            this.o[this.vajax].fdelete(method, uri, bucket);
        },
        changeBack(event){
            localStorage.setItem('back', event.target.value);
        },
        changeAjax(event){
            localStorage.setItem('ajax', event.target.value)
        },
        toggleOffCanvas(x){
            if(x=='open'){this.$refs.offcanvas.style.display=''}
            else{this.$refs.offcanvas.style.display='none'}
        }
    },
    beforeCreate(){
        if(!localStorage.getItem('ajax')){localStorage.setItem('ajax', 'Axios')}
        if(!localStorage.getItem('back')){localStorage.setItem('back', 'js')}
    },
    mounted(){
        this.$refs.offcanvas.style.display='none';
    },
}
</script>