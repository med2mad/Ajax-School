<template>
    <header>
        <div class="logo"><router-link to="/"><img src="imgs/logo.png" alt="logo"></router-link></div>
        <Auth ref="Auth" />
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

        <img src="imgs/up.png" class="upbtn" alt="offcanvas trigger" @click.self="toggleOffCanvas('open')">

    </div>

    <main>
        <DB v-for="item in DBs" :key="item.db+vback+vajax+vlimit+vname+vage" :_url="item.url" :_dblogofile="item.dblogofile" :_db="item.db"
                                :_vlimit="vlimit" :_vname="vname" :_vage="vage" :_vback="vback" :_vajax="vajax"
                                @logout="this.$refs.Auth.fLogout();"
        ></DB>
    </main>

    <div class="offcanvas" ref="offcanvas">
        <button @click="toggleOffCanvas('close')">check offCanvas in getbootstrap.com</button> <br>
    </div>

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
import DB from './components/DB.vue';
import Auth from './components/Auth.vue';
import '/public/styles/showresult.css';

export default{

    components: {DB, Auth},

    data(){return{
                vback:localStorage.getItem('back'), vajax:localStorage.getItem('ajax'), 
                vname:'', vage:'', vlimit:10, 
                DBs:[
                    {db:'mysql', dblogofile:'mysql.png', url:{'js':'http://localhost:5000/mysql/', 'php':'http://127.0.0.1:8000/MysqlModel/'} },
                    {db:'mongoose', dblogofile:'mongodb.png', url:{'js':'http://localhost:5000/mongoose/','php':'http://127.0.0.1:8000/MongoModel/'} },
                    {db:'postgresql', dblogofile:'postgresql.png', url:{'js':'http://localhost:5000/postgresql/', 'php':'http://127.0.0.1:8000/PostgreSQLModel/'} },
                    ]
                }
            },

    methods:{
        changeBack(event){
            localStorage.setItem('back', event.target.value);
        },
        changeAjax(event){
            localStorage.setItem('ajax', event.target.value);
        },
        toggleOffCanvas(x){
            if(x=='open'){this.$refs.offcanvas.style.display=''}
            else{this.$refs.offcanvas.style.display='none'}
        },
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