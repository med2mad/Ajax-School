<template>
    <transition name="popup">
        <Popup v-if="showpopup" @close="this.showpopup=false" :text="popuptext" />
    </transition>
    
    <div class="title"> <img :src="'tools\\'+_dblogofile" alt="DB logo">  </div>

    <div class="dbpaginate">
    <div class="db">

        <div class="db1">

            <div class="time" :class="{'green':bucket.timeF<100, 'orange':bucket.timeF>=100 && bucket.timeF<200, 'red':bucket.timeF>=200}">
                <div v-if="bucket.timeF">
                    <span class="timef">{{bucket.timeF}}</span><span class="ms">ms</span>
                </div>
            </div>

            <div class="data">
                <div v-if="bucket.rows && bucket.rows.length===0" class="nodata">
                    <h2 class="nodata">No Data !</h2>
                </div>
                <div v-else-if="bucket.rows" class="rows">
                    <form> <!--for input radio-->
                    <table>
                        <tr><th></th><th>#</th><th>Name</th><th>Age</th><th>Photo</th></tr>
                        <transition-group name="table">
                        <tr v-for="user in bucket.rows" class="datarow" :class="{selectedrow:user._id==selectedId}" :key="user._id" @click="selectUser(user._id);">
                            <td> <input type="radio" name="db" v-model="selectedId" :value="user._id"> </td>
                            <td>{{user._id}}</td> <td :ref="'trName'+user._id">{{user.name}}</td><td :ref="'trAge'+user._id">{{user.age}}</td>
                            <td><img :src="'uploads/'+(user.photo||'user.jpg')" :alt="'photo'+user._id" :ref="'trImg'+user._id"></td>
                        </tr>
                        </transition-group>
                    </table>
                    </form>
                </div>
                <div v-else class="loading">Loading ....</div>
                
            </div>
            
        </div>
        
        <div class="db2">
        <div class="form"> 
            <form ref="frmid" class="data" enctype="multipart/form-data">
            <table cellspacing="0">
                <tr><td id="name">
                    Name<input type="text" v-model="vname" name="name" maxlength ="30" autocomplete="off" spellcheck="false">
                    <div v-if="bucket.nameError" class="error">Enter a name from 1 to 30 characters</div>
                </td></tr>
                <tr class="agetr"><td id="age2">
                    Age<input type="number" v-model="vage" name="age" min="18" max="99" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'">
                    <div v-if="bucket.ageError" class="error">Enter age from 18 to 99</div>
                </td></tr>
                <tr>
                    <td>
                        <img ref="img" alt="img" @click="$refs[_db].click();" class="img" src="uploads/user.jpg"><br>
                        <input type="button" @click="$refs[_db].click();" value="Browse Photo...">
                        <input type="button" value="Remove Photo" @click="removePhoto">
                        <input type="file" name="photo" :ref="_db" accept="image/*" @change="onFileChange" style="display:none;"><br>
                    </td>
                </tr>
            </table>
            </form>
            <div class="ppd">
                <button class="post btn" @click="handlePost"> <div class="flash">POST</div> </button>
                <button class="put btn" @click="handlePut"> <div class="flash">PUT</div> </button><!-- fuck -->
                <button class="delete btn" @click="handleDelete"> <div class="flash">DELETE</div> </button>
            </div>
        </div>
        </div>

    </div>
    <Pagination v-if="bucket.rows && bucket.rows.length>0" :pagination="bucket.pagination" @changepage="(i)=>{changepage(i);}"></Pagination>
    </div>
</template>

<script>
import Pagination from './Pagination.vue';

export default{
    props: { _db:{type:String}, _dblogofile:{type:String}, back:{type:String} },

    emits: ['mountGet', 'mountGetPage', 'mountGetw', 'clickPost', 'clickPut', 'clickDelete'],

    components: {Pagination},

    data(){return{
                    bucket:{timeF:'',time0:0, rows:'', pagination:{}, nameError:false, ageError:false},
                    selectedId:'', 
                    vname:'', vage:'', selectedPhotoName:'', photoObject:null,
                    showpopup:false, popuptext:'', 
                }
            },

    methods:{
        handlePost(){
            if(this.dataCheck()){
                const fd = new FormData(this.$refs.frmid);
                fd.append('selectedPhotoName', this.selectedPhotoName);
                this.$emit('clickPost', fd, this.bucket);
                this.clear();
            }
        },
        handlePut(){
            if(!this.selectedId){this.popuptext='Select User !'; this.showpopup = true;}
            else if(this.dataCheck()){
                let selectedTr;
                for (let i = 0; i < this.bucket.rows.length; i++){//find <tr> to change
                    if(this.bucket.rows[i]["_id"]==this.selectedId)
                    { selectedTr = i; }
                }
                const fd = new FormData(this.$refs.frmid);
                fd.append('selectedPhotoName', this.selectedPhotoName);
                
                if(this.back=='js')
                    this.$emit('clickPut', 'PUT', this.selectedId, fd, selectedTr, this.bucket);
                else{
                    this.$emit('clickPut', 'POST', this.selectedId+'?_method=PUT', fd, selectedTr, this.bucket);
                }
                
                this.clear();
            }
        },
        handleDelete(){
            const lastTableId = this.bucket.rows[this.bucket.rows.length-1]["_id"];

            if(!this.selectedId){this.popuptext='Select User !';this.showpopup = true;}
            else{
                if(this.back=='js')
                    this.$emit('clickDelete', 'DELETE', this.selectedId, '&lasttableid='+lastTableId, this.bucket);
                else{
                    this.$emit('clickDelete', 'POST', this.selectedId+'?_method=DELETE&lasttableid='+lastTableId, this.bucket);
                }
                
                for (let i = 0; i < this.bucket.rows.length; i++){//find <tr> to remove
                    if(this.bucket.rows[i]["_id"]==this.selectedId)
                    {this.bucket.rows.splice(i, 1);}
                }
            }
        },

        selectUser(id){
            this.selectedId = id;
            this.vname = this.$refs['trName'+id][0].innerHTML;
            this.vage = this.$refs['trAge'+id][0].innerHTML;
            this.photoObject=null;            
            this.$refs[this._db].value= null;
            let src = this.$refs['trImg'+id][0].src;
            this.$refs.img.src = src;
            this.selectedPhotoName = src?src.split("/")[src.split("/").length-1]:''; 
        },
        removePhoto(){
            this.selectedPhotoName='';
            this.$refs.img.src='./uploads/user.jpg';
            this.photoObject=null;
            this.$refs[this._db].value= null;
        },
        clear(){
            this.vname='';
            this.vage='';
            this.selectedPhotoName='';
            this.$refs.img.src='./uploads/user.jpg';
            this.photoObject=null;
            this.$refs[this._db].value= null;
        },
        onFileChange(e){
            if (e.target.files[0]) { //e.target.files is the same as this.$refs.[this._db].files
                this.photoObject = e.target.files[0];
                this.$refs.img.src = URL.createObjectURL(this.photoObject);
            }
        },

        dataCheck(){ return true;
            this.vname = this.vname.trim();
            this.vage = Number.parseInt(this.vage);
            
            this.bucket.nameError=false; this.bucket.ageError=false;
            if (this.vname=="" || this.vname.length>30){this.bucket.nameError=true;}
            if (!Number.isInteger(this.vage) || this.vage<18 || this.vage>99){this.bucket.ageError=true;}
            
            return !(this.bucket.nameError || this.bucket.ageError);
        },

        changepage(i){
            this.$emit('mountGetPage', this.bucket, i);
        }
    },

    mounted(){
        //pass empty objects by reference to get promise result(FAST) 
        this.$emit('mountGet', this.bucket);

        //get function's return value(SLOW)
        // (async ()=>{
        //     this.$emit('mountGetw', this.bucket);
        // })(); //async self invoking
    },
}
</script>

<style>
    @import 'C:\Users\MED\Desktop\AJAX Paradise\public\styles\db.css';
</style>
