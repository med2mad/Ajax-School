<template>
    <header >
        <div ref="hamburgerButton" class="hamburgerButton">☰</div>
        <div class="logo"><router-link to="/"><img src="imgs/logo2.png" alt="logo"></router-link></div>
        <Auth ref="Auth" />
    </header>

    <div class="side" ref="side">
        <h2>Back-end :</h2>
        <div>
            <select v-model="vback" @change="changeBack" class="touchableinput">
                <option value="js">JS - Express</option><option value="php">PHP - Laravel</option>
            </select>
            <img id="backimg" src="imgs/node.png" style="width:25px; height:25px; margin-left:5px">
        </div>

        <h2>Ajax :</h2>
        <div>
            <select v-model="vajax" @change="changeAjax" class="touchableinput">
                <option value="Axios">Axios</option><option value="Fetch">Fetch</option><option value="JQuery">JQuery</option><option value="XHR">XHR</option>
            </select>
        </div>
        
        <div class="devider"></div>

        <h2>Filter :</h2>
        <input type="text" class="touchableinput" v-model="vname" name="name" placeholder="Name" autocomplete="off" spellcheck="false"><br>
        <input type="number" class="touchableinput" v-model="vage" name="age" placeholder="Age" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'" >
        
        <h2>Per page :</h2>
        <input type="number" min="0" required class="limit touchableinput" v-model="vlimit" name="limit" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'"><br>
        
        <div class="devider"></div>

        <input type="button" value="Reset Data" @click="mock" class="form-control" style="padding:10px 20px; margin-top:15px;">

        <div class="devider"></div>

        <div>
            <img src="imgs/up.png" class="offcanvasbtn" alt="codemirror" @click.self="toggleOffCanvas()">
        </div>

        <div class="devider"></div>

        <div style="margin-top:10px;">
            <a href="javascript:void(0)" @click="challenges" style="font-size:1.3rem; text-decoration:none; font-weight:bold">Challenges list</a>
        </div>
    </div>
    
    <main ref="main" style="margin-top:70px; background-image:linear-gradient(90deg, #eaf2fb, #8a8a8a, #eaf2fb);">
        <DB v-for="item in DBs" :key="item.db+vback+vajax+vlimit+vname+vage" :_url="item.url" :_dblogofile="item.dblogofile" :_db="item.db"
            :_vlimit="vlimit" :_vname="vname" :_vage="vage" :_vback="vback" :_vajax="vajax"
            @logout="this.$refs.Auth.fLogout();" @emitSnippet="(arg)=>{showSnippet(arg);}"
        ></DB>

        <div class="offcanvas" ref="offcanvas">
            <div style="text-align:right; padding:3px;">
                <select v-model="vtheme" @change="changetheme" class="codetheme"><option value="default">Light</option><option value="rubyblue">Dark</option></select> | 
                <button class="copybtn" @click="copy">Copy</button> | 
                <button class="closebtn" @click="toggleOffCanvas()"> X </button>
            </div>
            <textarea id="editor"></textarea>
        </div>
    </main>
</template>

<script>
import DB from './components/DB.vue';
import Auth from './components/Auth.vue';
import $ from "jquery";
import '/public/styles/showresult.css';
import * as CodeMirror from '/codemirror'
import '/codemirror/lib/codemirror.js'
import '/codemirror/lib/codemirror.css'
import '/codemirror/mode/javascript/javascript.js'
import '/codemirror/theme/rubyblue.css'
import '/codemirror/addon/scroll/simplescrollbars.js'
import '/codemirror/addon/scroll/simplescrollbars.css'

export default{

    components: {DB, Auth},

    data(){return{
                vback:localStorage.getItem('back'), vajax:localStorage.getItem('ajax'), 
                vname:'', vage:'', vlimit:10, 
                rotation:'0', vtheme:'rubyblue', doCM:true,
                DBs:[
                    {db:'mysql', dblogofile:'mysql.png', url:{'js':'http://localhost:5000/Mysql/', 'php':'http://127.0.0.1:8000/Mysql/'} },
                    // {db:'mongodb', dblogofile:'mongodb.png', url:{'js':'http://localhost:5000/Mongodb/','php':'http://127.0.0.1:8000/Mongodb/'} },
                    {db:'postgresql', dblogofile:'postgresql.png', url:{'js':'http://localhost:5000/Postgresql/', 'php':'http://127.0.0.1:8000/Postgresql/'} },
                    ]
                }
            },

    methods:{
        changeBack(event){
            localStorage.setItem('back', event.target.value);
            this.showSnippet(localStorage.getItem('snippet'));
            if(event.target.value=='php'){document.getElementById('backimg').src='imgs/laravel.png'}
            else{document.getElementById('backimg').src='imgs/node.png'}
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
        },
        showSnippet(arg){
                document.getElementById('editor').value = arg;
                CodeMirror.fromTextArea(document.getElementById('editor'), {
                    lineNumbers: true,
                    mode:'javascript',
                    theme:localStorage.getItem('theme'),
                    scrollbarStyle:'overlay'
                });
        },
        copy(){
            var copyText = document.getElementById("editor");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(copyText.value);
        },
        async mock(){
            await fetch('http://localhost:5000/mock?username='+localStorage.getItem('username')).then(res=>res.json())
            window.location.reload()
        },
        challenges(){
            window.location.href = 'html/challenges.html';
        },
    },
    
    beforeCreate(){
        if(!localStorage.getItem('ajax')){localStorage.setItem('ajax', 'Axios')}
        if(!localStorage.getItem('back')){localStorage.setItem('back', 'js')}
        if(!localStorage.getItem('theme')){localStorage.setItem('theme', 'rubyblue')}
    },
    
    mounted(){
        this.$refs.offcanvas.style.display='none';
        this.$refs.hamburgerButton.addEventListener('click', () => {
            this.$refs.side.classList.toggle('nosidebar');
        });
        this.vtheme = localStorage.getItem('theme');
        if(localStorage.getItem('back')=='php'){document.getElementById('backimg').src='imgs/laravel.png'}
        else{document.getElementById('backimg').src='imgs/node.png'}
    },

}
</script>