<template>
    <div class="title"> <img :src="'imgs/tools/'+_dblogofile" alt="DB logo"> </div>

    <div ref="db" style="padding-bottom:20px">
    
    <div class="db">
        
        <div class="db1">
        <div class="data">
            <div v-if="(store.rows && store.rows.length===0)" class="nodata">
                <h2 class="nodata">No Data !</h2>
            </div>
            <div v-else-if="store.rows" class="rows">
                <form> <!--for input radio-->
                <table>
                    <tr class="headerrow"><th></th><th>id</th><th>Name</th><th>Age</th><th>Photo</th></tr>
                    <transition-group name="table">
                    <tr v-for="profile in store.rows" class="datarow" :class="{selectedrow:profile._id==selectedId}" :key="profile._id" @click="selectProfile(profile._id);">
                        <td> <input type="radio" name="db" v-model="selectedId" :value="profile._id"> </td>
                        <td>{{profile._id}}</td> <td :ref="'trName'+profile._id">{{profile.name}}</td><td :ref="'trAge'+profile._id">{{profile.age}}</td>
                        <td><img :src="'uploads/'+ encodeURIComponent(profile.photo||'profile.jpg').replace(/%2520/g, ' ')" :alt="'photo'+profile._id" :ref="'trImg'+profile._id"></td>
                    </tr>
                    </transition-group>
                </table>
                </form>
            </div>
            <div v-else class="loading">Loading ....</div>
        </div>
        </div>
        
        <div class="x" ref="x">X</div>

        <div class="db2" ref="db2" :id="this._db" @click.self="toggleForm">
        <div class="form"> 
            <form ref="frmid" class="data" enctype="multipart/form-data">
            <table cellspacing="0">
                <tr><td id="name">
                    Name<input type="text" class="touchableinput" v-model="vname" name="name" maxlength ="30" autocomplete="off" spellcheck="false">
                    <div v-if="store.nameError" class="error">Enter a name from 1 to 30 characters</div>
                </td></tr>
                <tr class="agetr"><td id="age2">
                    Age<input type="number" class="touchableinput" v-model="vage" name="age" min="18" max="99" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'">
                    <div v-if="store.ageError" class="error">Enter age from 18 to 99</div>
                </td></tr>
                <tr>
                    <td style="    padding-bottom: 0 !important;">
                        <input type="file" name="photo" :ref="_db" accept="image/*" @change="onFileChange" style="display:none;">
                        <img ref="img" alt="img" @click="$refs[_db].click();" class="img" src="uploads/profile.jpg">
                        <div style="margin-top:2px; display:flex;">
                            <input type="button" @click="$refs[_db].click();" value="choose Photo...">
                            <input type="button" value="No Photo" @click="removePhoto">
                        </div>
                        <input type="button" value="Clear" class="clearbutton" @click="clear">
                    </td>
                </tr>
            </table>
            </form>
            <div class="ppd">
                <button class="post btn" @click="handlePost"> <div class="flash">Create</div> </button>
                <button class="put btn" @click="handlePut"> <div class="flash">Update</div> </button><!-- fuck -->
                <button class="delete btn" @click="handleDelete"> <div class="flash">Delete</div> </button>
            </div>
        </div>
        </div>

    </div>

    <Pagination v-if="store.rows && store.rows.length>0" :pagination="store.pagination" @changepage="(i)=>{changepage(i);}"></Pagination>

    </div>

    <input v-if="false" type="checkbox" v-model="venable" @change="changeEnable">
</template>

<script>
import Swal from 'sweetalert2';
import Pagination from './Pagination.vue';
import axios from './AJAX services/Axios';
import fetch from './AJAX services/Fetch';
import jquery from './AJAX services/JQuery';
import xhr from './AJAX services/XHR';
import '/public/styles/db.css';

export default{
    props:{ _db:String, _dblogofile:String, _url:Object,
            _vage:String, _vname:String, _vlimit:Number, 
            _vback:String, //used to get the right "_url" prop
            _vajax:String, //used to get the right "ajaxes" state
        },

    emits: ['mountGet', 'logout', 'emitSnippet'],

    components: { Pagination },

    data(){return{
                    store:{ rows:'', pagination:{}, time:'',
                            nameError:false, ageError:false, db:this._db
                        }, //sending states by reference (no state management library)

                    ajaxes:{'Axios':axios, 'Fetch':fetch, 'JQuery':jquery, 'XHR':xhr},
                    selectedId:'', selectedPhotoName:'', photoObject:null,
                    vname:'', vage:'', venable:localStorage.getItem(this._db),
                }
            },

    methods:{
        async handlePost(){
            if(this.checkUser() && this.checkData()){
                const fd = new FormData(this.$refs.frmid);
                fd.append('selectedPhotoName', this.selectedPhotoName);
                fd.append('token', localStorage.getItem('token'));
                this.store.time = new Date();
                await this.ajaxes[this._vajax].fpost(this._url[this._vback], fd, this.store, this._vlimit, this._vback, this._vajax);
                this.clear();
                this.$emit('emitSnippet', localStorage.getItem('snippet'));
            }
        },
        async handlePut(){
            if(!this.checkUser()){return;}

            if(!this.selectedId){Swal.fire('Select Profile !');}
            else if(this.checkData()){
                let selectedTr;
                for (let i = 0; i < this.store.rows.length; i++){//find <tr> to change
                    if(this.store.rows[i]["_id"]==this.selectedId)
                    { selectedTr = i; }
                }

                const fd = new FormData(this.$refs.frmid);
                fd.append('selectedPhotoName', this.selectedPhotoName);
                fd.append('token', localStorage.getItem('token'));
                
                this.store.time = new Date();
                if(this._vback=='js'){//no PUT http method in PHP
                    await this.ajaxes[this._vajax].fput('PUT', this._url['js']+this.selectedId, fd, selectedTr, this.store, this._vback, this._vajax);
                }else{
                    await this.ajaxes[this._vajax].fput('POST', this._url['php']+this.selectedId+'?_method=PUT', fd, selectedTr, this.store, this._vback, this._vajax);
                }
                
                this.clear();
                this.$emit('emitSnippet', localStorage.getItem('snippet'));
            }
        },
        async handleDelete(){
            if(!this.checkUser()){return;}

            if(!this.selectedId){Swal.fire('Select Profile !');}
            else{
                const lastTableId = this.store.rows[this.store.rows.length-1]["_id"];
                this.store.time = new Date();
                if(this._vback=='js') //no DELETE http method in PHP
                    await this.ajaxes[this._vajax].fdelete('DELETE', this._url['js']+this.selectedId+'?'+'lasttableid='+lastTableId, this.store, this._vback, this._vajax)
                else 
                    await this.ajaxes[this._vajax].fdelete('POST', this._url['php']+this.selectedId+'?'+'lasttableid='+lastTableId+'&_method=DELETE', this.store, this._vback, this._vajax)

                for (let i = 0; i < this.store.rows.length; i++){//find <tr> to remove
                    if(this.store.rows[i]["_id"]==this.selectedId)
                    {this.store.rows.splice(i, 1);}
                }

                this.selectedId = '';
                this.$emit('emitSnippet', localStorage.getItem('snippet'));
            }
        },

        selectProfile(id){
            this.selectedId = id;
            this.vname = this.$refs['trName'+id][0].innerText;
            this.vage = this.$refs['trAge'+id][0].innerText;
            this.photoObject=null;            
            this.$refs[this._db].value= null;
            let src = this.$refs['trImg'+id][0].src;
            this.$refs.img.src = src;
            this.selectedPhotoName = src?src.split("/")[src.split("/").length-1]:''; 
            this.toggleForm();
        },
        removePhoto(){
            this.selectedPhotoName='';
            this.$refs.img.src='./uploads/profile.jpg';
            this.photoObject=null;
            this.$refs[this._db].value= null;
        },
        clear(){
            this.vname='';
            this.vage='';
            this.selectedPhotoName='';
            this.$refs.img.src='./uploads/profile.jpg';
            this.photoObject=null;
            this.$refs[this._db].value= null;
        },
        onFileChange(e){
            this.$refs.img.src = './uploads/profile.jpg';
            if (e.target.files[0]) { //e.target.files is the same as this.$refs.[this._db].files
                this.photoObject = e.target.files[0];
                this.$refs.img.src = URL.createObjectURL(this.photoObject);
            }
        },

        checkData(){
            this.vname = this.vname.trim();
            if (this.vage!=""){this.vage = Number.parseInt(this.vage);}
            
            this.store.nameError=false; this.store.ageError=false;
            if (this.vname=="" || this.vname.length>30){this.store.nameError=true;}
            if (!Number.isInteger(this.vage) || this.vage<18 || this.vage>99){this.store.ageError=true;}

            return !(this.store.nameError || this.store.ageError);
        },

        checkUser(){
            if(!localStorage.getItem('token')){
                this.$emit('logout');
                Swal.fire('Login Please.');
                return false;
            }
            else {return true;}
        },
        GETuri(str, currentpage){
            let query = '';
            if (Number.isInteger(this._vlimit)&&this._vlimit>=0){query += '&limit='+this._vlimit};
            if (currentpage>1){query += '&page='+currentpage}
            if (this._vname.trim()){query += '&name='+this._vname;}
            if (Number.isInteger(this._vage)){query += '&age='+this._vage;}
            
            query = '?' + query.slice(1); //replace the first '&' with '?'
            return str+query;
        },
        
        changeEnable(){
            localStorage.setItem(this._db, this.venable);
            if(this.venable){
                this.$refs.db.style.display='';
                this.$emit('emitSnippet', localStorage.getItem('snippet'));
            }
            else{
                this.$refs.db.style.display='none';
            }
        },

        async changepage(i){
            if(localStorage.getItem('username')){
                this.store.time = new Date();
                await this.ajaxes[this._vajax].fget(this.GETuri(this._url[this._vback], i), this.store, this._vlimit, i, this._vback, this._vajax);
                this.$emit('emitSnippet', localStorage.getItem('snippet'));
            }
        },

        toggleForm(){
            this.$refs.db2.classList.toggle('showdb2');
            this.$refs.x.classList.toggle('showx');
        }
    },

    beforeCreate(){
        if(!localStorage.getItem(this._db)){localStorage.setItem(this._db, true)}
    },

    mounted(){
        if(localStorage.getItem('username')){
            if(this.venable=='true'){
                this.changepage(1);
                this.$refs.db.style.display='';
            }else{
                this.$refs.db.style.display='none';
            }
        }
    }
}
</script>