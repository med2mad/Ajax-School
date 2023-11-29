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
                <button class="post btn" @click="handlePost"> POST </button>
                <div class="put btn" @click="handlePut"> <div class="flash">PUT</div> </div><!-- fuck -->
                <div class="delete btn" @click="handleDelete"> <div class="flash">DELETE</div> </div>
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
@font-face {
    font-family: Rajdhani-Light;
    src: url('C:\Users\MED\Desktop\AJAX Paradise\public\fonts\Rajdhani-Light.ttf');
}

.title{
    background-image: linear-gradient(45deg , white 5% , #c5c5c5 50%, white  ) ;
    border: solid 4px #2c3e50;
    padding: 1px;
    border-radius: 0px 0px 15px 15px;
}
.title img{
    height:75px;
}

.db{
    background-image: linear-gradient(90deg , #eaf2fb , #8a8a8a , #eaf2fb ) ;
    padding-bottom: 25px;
    display: flex; /* align .db1|.db2 */
    flex-wrap: wrap;
    justify-content: center;
    min-height: 525px; /* changing limit / deleting makes the next .title go up and down */
}

.db .db1{
    border: solid 4px;
    border-radius: 10px 10px 10px 10px;
    background-color: white;
    max-height: 500px;
    min-height: 90px; /* 'No Data!!' shows timeF out of bounds (optional ?)*/
    flex: 1;
    display:flex; /* align .time|.data */ 
}

.db1 .time{
    border-right: solid 4px;
    font-size: 1.2rem;
    width:30px;
}
.db1 .time div{
    transform: rotateZ(90deg) translateX(30%);
    white-space: nowrap;
}
.db1 .time .timef{
    font-weight: bold;
}
.db1 .time .ms{
    font-size: 0.8rem;
}

.db1 .data{
    overflow: auto;
}
.db1 .data , .db1 .data table{
    width:100%; /* makes the table columns responsive because .db{display:flex} and .db2 is fixed */
}
.db1 table td{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    border: solid 2px;
    font-weight: bold;
    border-radius:5px;
    padding: 0px 1px;
}
.db1 table td img{
    background-color: black;
    width: 40px;
    height: 40px;
    border-left: solid 1px;
    border-right: solid 1px;
}

.db1 table th{
    background-image: linear-gradient(180deg , rgb(0, 17, 110) ,  rgb(84, 98, 179) 40% , rgb(0, 17, 110) 70% ) ;
    color: white;
    border-radius: 7px;
    box-shadow: 0px 0px 1px 1px white; /* because of {position:sticky} data appair behinde <hr> */
    padding: 5px;
    position:sticky;
    top:1px; /* {position:sticky} requires top */
}

.db1 table .datarow{
    background-color: rgb(238, 238, 238);
    height: 40px;
}
.db1 table .datarow:nth-child(odd){
    background-color: white;
}

.db1 table .selectedrow:nth-child(odd) td , 
.db1 table .selectedrow:nth-child(even) td {
    background-color: rgb(184, 255, 184);
    color:green;
    box-shadow: 0px 0px 1px 1px green;
}

.db2{
    width:auto; /*which is a fixed size because .db{display:flex} makes .db2 intrensic ([width:max-content] does the same)*/
}
.db2 .form{
    font-family: Rajdhani-Light;
    font-weight: bold;
    background-color: white;
    border-radius: 20px;
    border: solid 4px white  ;
    min-height: 418px;
    display: flex; /* align .data|.ppd */
}
.form .data table td{
    padding:4px;
    border-radius: 15px 0px 0px 15px;
    background-color: rgb(196, 196, 196);
}  
.agetr td{
    border-bottom: solid 4px white;
    border-top: solid 4px white;
}
.form .data table input{
    width:100%;
    border-radius: 10px;
    font-size: 1rem;
    text-align: center;
}
.form .data table img{
    background-color:gray;
    border: solid 1px;
    border-radius: 10px;
    cursor: pointer;
    width: 250px;
    height: 250px;
}
.form .data table input[type="button"]{
    font-family: Rajdhani-Light;
    font-weight: bold;
} 

.form .ppd{
    background-color: rgb(73, 73, 73);
    border-radius: 0px 20px 20px 0px;
    border-left:solid 1px black;
    overflow: hidden;
    display: grid; /* align buttons */
    grid-template-columns: 0.7fr; /* align buttons */
}
.form .ppd .btn{
    border-radius: 0px 15px 15px 0px;
    transition-property: transform;
    transition-duration: 250ms;
    border: solid 2px;
    background-repeat: no-repeat;
    background-position: 90% center;
    margin-left:-100%;
    overflow: hidden;
}
.form .ppd .btn:hover{
    transform: translateX(15%);
}

.form .ppd .btn .flash{ 
    width: 40px;
    font-size: 1.2rem;
    letter-spacing: 3px;
}
.form .ppd .post .flash{/* (this is not how it should be done) */
    transform: rotateZ(90deg) translate(120%,-30%);
}.form .ppd .put .flash{
    transform: rotateZ(90deg) translate(140%,-30%);
}.form .ppd .delete .flash{
    transform: rotateZ(90deg) translate(100%,-30%);
}

.form .ppd .post{
    color: green;
    border-color: green;
    background-color: rgb(221, 221, 221);  
}
.form .ppd .put{
    color: rgb(87, 72, 221);  
    border-color: rgb(87, 72, 221);  
    background-color: rgb(221, 221, 221);  
}
.form .ppd .delete{
    color: rgb(207, 72, 72);
    border-color: rgb(207, 72, 72);
    background-color: rgb(221, 221, 221);  
}

/*-------------- animate popup-------------*/
@keyframes anim{
    0%{transform: translateY(-50px); opacity: 0;}
    50%{transform: translateY(10px); opacity: 1;}
    100%{transform: translateY(0); opacity: 1;}
}
.popup-enter-active{
    animation: anim 250ms;
}
.popup-leave-active{
    animation: anim 250ms reverse;
}
/*-------------- animate tables -------------*/
@keyframes anim2{
    0%{transform: translateX(-100px); opacity: 0;}
}
.table-enter-active{
    animation: anim2 300ms ease-in;
}
.table-leave-active{ /* not having the leaving row, else table will have limit+1 and pushes down title of next DB */
    position:absolute;
    opacity: 0;
}
/* ------------- automatically numbered rows -------------*/
.db1 table {
counter-reset: rowNumber -1;
}
.db1 table tr {
counter-increment: rowNumber;
}
.db1 table tr td:nth-child(2)::before {
content: counter(rowNumber);
}
/* ------------- class declarations -------------*/
.green{
    background-color: green;
}
.red{
    background-color: red;
}
.orange{
    background-color: orange;
}
</style>
