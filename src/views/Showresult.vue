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

        <img src="imgs/up.png" class="offcanvasbtn" alt="offcanvas trigger" @click.self="toggleOffCanvas()">
    </div>

    <main ref="main">
        <DB v-for="item in DBs" :key="item.db+vback+vajax+vlimit+vname+vage" :_url="item.url" :_dblogofile="item.dblogofile" :_db="item.db"
            :_vlimit="vlimit" :_vname="vname" :_vage="vage" :_vback="vback" :_vajax="vajax"
            @logout="this.$refs.Auth.fLogout();" @emitSnippet="(arg)=>{showSnippet(arg);}"
        ></DB>

        <div class="offcanvas" ref="offcanvas">
            <button class="copybtn" @click="copy">Copy</button> | 
            <select v-model="vtheme" @change="changetheme" class="codetheme"><option value="default">Light</option><option value="rubyblue">Dark</option></select>
            <textarea id="editor"></textarea>
        </div>
    </main>

    <footer>
        <div class="footer1">
            <img src="imgs/up.png" class="offcanvasbtn2" alt="offcanvas trigger" @click.self="toggleOffCanvas()">
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
import $ from "jquery";
import '/public/styles/showresult.css';
// import * as CodeMirror from '/codemirror';
// import './../../codemirror/lib/codemirror.js'
// import './../../codemirror/lib/codemirror.css'
// import './../../codemirror/mode/javascript/javascript.js'
// import './../../codemirror/theme/rubyblue.css'

export default{

    components: {DB, Auth},

    data(){return{
                vback:localStorage.getItem('back'), vajax:localStorage.getItem('ajax'), 
                vname:'', vage:'', vlimit:10, 
                rotation:'0', vtheme:'rubyblue',
                DBs:[
                    {db:'mysql', dblogofile:'mysql.png', url:{'js':'http://localhost:5000/Mysql/', 'php':'http://127.0.0.1:8000/Mysql/'} },
                    {db:'mongoose', dblogofile:'mongodb.png', url:{'js':'http://localhost:5000/Mongoodb/','php':'http://127.0.0.1:8000/Mongoodb/'} },
                    {db:'postgresql', dblogofile:'postgresql.png', url:{'js':'http://localhost:5000/Postgresql/', 'php':'http://127.0.0.1:8000/Postgresql/'} },
                    ]
                }
            },

    methods:{
        changeBack(event){
            localStorage.setItem('back', event.target.value);
            this.showSnippet(localStorage.getItem('snippet'));
        },
        changeAjax(event){
            localStorage.setItem('ajax', event.target.value);
            this.showSnippet(localStorage.getItem('snippet'));
        },
        changetheme(event){
            localStorage.setItem('theme', event.target.value);
            this.showSnippet(localStorage.getItem('snippet'));
        },
        toggleOffCanvas(){
            if(this.rotation==='0') {
                $('.offcanvas', ()=>{this.$refs.main.style.marginBottom='150px'}).slideToggle();
                this.rotation='180deg';
            }
            else {
                $('.offcanvas', ()=>{this.$refs.main.style.marginBottom='0'}).slideToggle();
                this.rotation='0';
            }
            $('.offcanvasbtn').css('transform', 'rotate('+this.rotation+')');
            $('.offcanvasbtn2').css('transform', 'rotate('+this.rotation+')');
        },
        showSnippet(arg){
            document.getElementById('editor').value = arg;
            
            CodeMirror.fromTextArea(document.getElementById('editor'), {
                lineNumbers: true,
                mode:'javascript',
                theme:localStorage.getItem('theme')
            });
        },
        copy(){
            var copyText = document.getElementById("editor");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(copyText.value);
        },
    },
    
    beforeCreate(){
        if(!localStorage.getItem('ajax')){localStorage.setItem('ajax', 'Axios')}
        if(!localStorage.getItem('back')){localStorage.setItem('back', 'js')}
        if(!localStorage.getItem('theme')){localStorage.setItem('theme', 'rubyblue')}
    },
    
    mounted(){
        this.$refs.offcanvas.style.display='none';
        this.vtheme = localStorage.getItem('theme');
    },
}
</script>