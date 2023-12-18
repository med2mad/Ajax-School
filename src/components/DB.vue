<template>
    <transition name="popup">
        <Popup v-if="showpopup" @close="this.showpopup=false" :text="popuptext" />
    </transition>
    
    <div class="title"> <img :src="'tools\\'+_dblogofile" alt="DB logo">  </div>

    <div class="db">

        <div class="db1" >

            <div class="time" :class="{'green':bucket.timeF<100, 'orange':bucket.timeF>=100 && bucket.timeF<200, 'red':bucket.timeF>=200}">
                <div v-if="bucket.timeF">
                    <span class="timef">{{bucket.timeF}}</span><span class="ms">ms</span>
                </div>
            </div>

            <div class="data">
                <div v-if="bucket.a && bucket.a.length===0" class="nodata">
                    <h2>No Data!!</h2>
                </div>
                <div v-else-if="bucket.a" class="rows">
                    <form> <!--for input radio-->
                    <table cellspacing="2">
                        <tr><th></th><th>#</th><th>Name</th><th>Age</th><th>Photo</th></tr>
                        <transition-group name="table">
                        <tr v-for="user in bucket.a" class="datarow" :class="{selectedrow:user[_idClmn]==selectedId}" :key="user[_idClmn]" @click="selectUser(user[_idClmn]);">
                            <td> <input type="radio" name="db" v-model="selectedId" :value="user[_idClmn]"> </td>
                            <td></td> <td :ref="'trName'+user[_idClmn]">{{user.name}}</td> <td :ref="'trAge'+user[_idClmn]">{{user.age}}</td>
                            <td><!--public folder--><img :src="'uploads/'+(user.photo||'user.jpg')" :alt="'photo'+user[_idClmn]" :ref="'trImg'+user[_idClmn]"></td>
                        </tr>
                        </transition-group>
                    </table>
                    </form>
                </div>
                <div v-else>Loading ....</div>
            </div>
        </div>

        <div class="db2">
        <div class="form"> 
            <form ref="frmid" class="data" enctype="multipart/form-data">
            <table cellspacing="0">
                <tr><td id="name">Name<input type="text" v-model="vname" name="name" maxlength ="20" autocomplete="off" spellcheck="false"></td></tr>
                <tr class="agetr"><td id="age2">Age<input type="number" v-model="vage" name="age" min="18" max="99" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'"></td></tr>
                <tr>
                    <td>
                        <img ref="img" alt="img" @click="$refs[_db].click();" class="img" src="uploads/user.jpg"><br>
                        <input type="button" @click="$refs[_db].click();" value="Browse Photo...">
                        <input type="button" value="Remove" @click="removePhoto">
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
</template>

<script>
export default{
    props: { _db:{type:String}, _dblogofile:{type:String}, _idClmn:{type:String}, },

    emits:['mountGet', 'mountGetw', 'clickPost', 'clickPut', 'clickDelete'],
 
    data(){return{
                bucket:{timeF:'',time0:0, a:'', s:''},
                selectedId:'', 
                vname:'', vage:'', selectedPhotoName:'', photoObject:null,
                showpopup:false, popuptext:'', 
                }
            },

    methods:{
        async handlePost(){
            if(await this.dataCheck()){this.showpopup = true;}
            else{
                const fd = new FormData(this.$refs.frmid);
                fd.append('selectedPhotoName', this.selectedPhotoName);
                this.$emit('clickPost', fd, this.bucket);
                this.clear();
                }
        },
        async handlePut(){
            if(!this.selectedId){this.popuptext='Select User !'; this.showpopup = true;}
            else if(await this.dataCheck()){this.showpopup = true;}
            else{
                let selectedTr;
                for (let i = 0; i < this.bucket.a.length; i++){//find <tr> to change
                    if(this.bucket.a[i][this._idClmn]==this.selectedId)
                    { selectedTr = i; }
                }
                const fd = new FormData(this.$refs.frmid);
                fd.append('selectedPhotoName', this.selectedPhotoName);
                this.$emit('clickPut', this.selectedId, fd, selectedTr, this.bucket);

                this.clear();
            }
        },
        handleDelete(){
            const lastTrId = this.bucket.a[this.bucket.a.length-1][this._idClmn];

            if(!this.selectedId){this.popuptext='Select User !';this.showpopup = true;}
            else{
                this.$emit('clickDelete', this.selectedId, lastTrId, this.bucket);
                
                for (let i = 0; i < this.bucket.a.length; i++){//find <tr> to remove
                    if(this.bucket.a[i][this._idClmn]==this.selectedId)
                    {this.bucket.a.splice(i, 1);}
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

        async dataCheck(){
            if (this.vname!=="" && !Number.isInteger(this.vage)){this.vage = Number.parseInt(this.vage);}
            
            this.popuptext='';
            if (this.vname==="" || this.vage===""){this.popuptext='Insert Data !';}
            else if (!Number.isInteger(this.vage) || this.vage<18 || this.vage>99){this.popuptext='Insert Integer between 18 and 99 !'; }
            
            return this.popuptext;
        },
    },

    mounted(){
        //pass empty objects by reference to get promise result(FAST) 
        this.$emit('mountGet', this.bucket);
        
        //get function's return value(SLOW)
        (async ()=>{
            this.$emit('mountGetw', this.bucket);
        })(); //async self invoking
    },
}
</script>

<style>

@import 'C:\Users\MED\Desktop\AJAX Paradise\public\styles\db.css';

</style>
