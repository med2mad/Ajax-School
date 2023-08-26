<template>
    <transition name="popup">
        <Popup v-if="showpopup" @close="this.showpopup=false" :text="popuptext" />
    </transition>
    
    <div class="title"> <img v-if="!fake" :src="'DBsImages\\'+title" alt="title"> <div v-else > <p>Fake API<br/> jsonplaceholder.typicode.com</p> </div> </div>

    <div class="db" :class="color">

        <div class="db1">
            <div>
                <div v-if="bucket.a && bucket.a.length===0">
                    <h2>No Data !! </h2>
                </div>
                <div v-else>
                    <div v-if="bucket.a" >
                    <form>
                    <table cellspacing="4">
                        <tr><th v-if="!fake"></th><th>#</th><th>Name</th><th v-if="!fake">Age</th><th v-if="!fake">Photo</th></tr>
                        <transition-group name="table">
                        <tr v-for="user in bucket.a" class="datarow" :class="{selectedrow:user[_id]==selectedId}" :key="user[_id]" @click="selectUser(user[_id]);">
                            <td v-show="!fake"> <input type="radio" name="db" v-model="selectedId" :value="user[_id]"> </td>
                            <td></td> <td :ref="'trName'+user[_id]">{{user.name}}</td> <td v-if="!fake" :ref="'trAge'+user[_id]">{{user.age}}</td>
                            <td v-if="!fake"><img v-show="user.photo" :src="'./uploads/'+user.photo" :alt="'photo'+user[_id]" :ref="'trImg'+user[_id]"></td>
                        </tr>
                        </transition-group>
                    </table>
                    </form>
                    </div>
                    <div v-else>Loading ....</div>
                </div>
            </div>
            <h2 :class="{'green':bucket.timeF<100, 'orange':bucket.timeF>=100 && bucket.timeF<200, 'red':bucket.timeF>=200}">
                [{{bucket.timeF + ' ms'||'Calculating ...'}}]
            </h2>
        </div>

        <div class="db2">
        <div class="form" v-if="!fake">
            <div class="data">
            <table cellspacing="0">
                <tr><td id="name">Name:<input type="text" v-model="vname" name="name" maxlength ="30" autocomplete="off" spellcheck="false"></td></tr>
                <tr class="agetr"><td id="age2">Age:<input type="number" v-model="vage" name="age" min="18" max="99" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'"></td></tr>
                <tr>
                    <td>
                        <img ref="img" alt="img" onclick="document.getElementById('inpfile').click();" class="img" src="user.jpg"><br>
                        <input type="button" onclick="document.getElementById('inpfile').click();" value="Browse Photo...">
                        <input type="button" value="Remove Photo" @click="remove">
                        <input type="file" id="inpfile" ref="inpfile" accept="image/*" @change="onFileChange" style="display:none;"><br>
                    </td>
                </tr>
            </table>
            </div>
            <div class="btn">
                <div class="post" @click="handlePost"></div>
                <div class="put" @click="handlePut"></div>
                <div class="delete" @click="handleDelete"></div>
            </div>
        </div>
        <div v-else class="form">jsonplaceholder.typicode.com</div>
        </div>

    </div>
</template>

<script>
import axios from 'axios' //upload photos

export default{
    props: { title:{type:String}, _id:{type:String}, fake:{type:Boolean}, uri:{type:String},  color:{type:String}, },

    emits:['mountGet', 'mountGetw', 'clickPost', 'clickPut', 'clickDelete'],
 
    data(){return{
                bucket:{timeF:'',time0:0, a:'', s:''},
                selectedId:'',
                vname:'', vage:'', multerRandomPhotoName:'', photoObject:null,
                showpopup:false, popuptext:'', 
                }
            },

    methods:{
        async handlePost(){
            if(await this.dataCheck()){this.showpopup = true;}
            else{
                this.$emit('clickPost', {"name":this.vname, "age":this.vage, "photo":this.multerRandomPhotoName}, this.bucket);
                this.remove();
                }
        },
        async handlePut(){
            if(!this.selectedId){this.popuptext='Select User !'; this.showpopup = true;}
            else if(await this.dataCheck()){this.showpopup = true;}
            else{
                this.$emit('clickPut', this.selectedId, {"name":this.vname, "age":this.vage, "photo":this.multerRandomPhotoName});
                
                for (let i = 0; i < this.bucket.a.length; i++){//find <tr> to change
                    if(this.bucket.a[i][this._id]==this.selectedId)
                    {
let b={name:this.vname, age:this.vage, photo:this.multerRandomPhotoName};
  this.bucket.a[i] = b;
                        // this.bucket.a[i].name = this.vname;
                        // this.bucket.a[i].age = this.vage;
                        // this.bucket.a[i].photo = this.multerRandomPhotoName;
                    }
                }

                this.remove();
            }
        },
        handleDelete(){ //#TODO table needs to get the last inserted row after delete, instead of refreshing
            if(!this.selectedId){this.popuptext='Select User !';this.showpopup = true;}
            else{this.$emit('clickDelete', this.selectedId);}
        },

        selectUser(id){
            this.selectedId = id;
            this.vname = this.$refs['trName'+id][0].innerHTML;
            this.photoObject=null;
            
            if (!this.fake) { //fake has no PPD
                this.$refs.inpfile.value= null;
                this.vage = this.$refs['trAge'+id][0].innerHTML;
                let src = this.$refs['trImg'+id][0].src;
                this.$refs.img.src = src;
                this.multerRandomPhotoName = src?src.split("/")[src.split("/").length-1]:''; 
            }
        },
        remove(){
            this.vname='';
            this.vage='';
            this.multerRandomPhotoName='';
            this.$refs.img.src='';
            this.photoObject=null;
            this.$refs.inpfile.value= null;
        },
        onFileChange(e){
            if (e.target.files[0]) { //e.target.files is the same as this.$refs.inpfile.files
                this.photoObject = e.target.files[0];
                this.$refs.img.src = URL.createObjectURL(this.photoObject);
            }
        },

        async dataCheck(){
            this.popuptext='';
            if (this.vname!=="" && !Number.isInteger(this.vage)){this.vage = Number.parseInt(this.vage);}
            
            if (this.vname==="" || this.vage===""){this.popuptext='Insert Data !';}
            else if (!Number.isInteger(this.vage) || this.vage<18 || this.vage>99){this.popuptext='Insert Integer between 18 and 99 !'; }
            else if (this.photoObject) {
                const fd = new FormData();
                fd.append('photo', this.photoObject , this.photoObject.name)
                try {
                    const response = await axios.post('http://localhost:5999/upload',fd);
                    this.multerRandomPhotoName = response.data.newPhotoName;
                } catch (error) {
                    this.popuptext='Photo not valid !'; 
                }
            }
            
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
    
    .title{
        background-image: linear-gradient(45deg , white 5% , #42b983 50%, white  ) ;
        border: solid 4px #2c3e50;
        padding: 3px;
        text-align: center;
        width:80%;
        margin:auto;
    }
    .title img{
        height:75px;
    }

    .db{
        /* background-image: linear-gradient(90deg , #eaf2fb , #8a8a8a , #eaf2fb ) ; */
        background: radial-gradient( #eaf2fb  , rgb(177, 177, 177) , #eaf2fb );

        display: flex; /* align .db1|.db2 */
        justify-content: center;
        padding: 10px 0px 25px 0px;
        flex-wrap: wrap;
        gap: 10px;
        /* background-color: ; */
    }
    .blue{
        /* background-image: linear-gradient(90deg , rgb(163, 163, 253) , rgb(56, 56, 255) , rgb(163, 163, 253)  ) ; */
        /* background: radial-gradient( white ,rgb(255, 202, 117)  ); */

        /* background-color: blue; */
    }
    .green{
        background-color: green;
    }
    .red{
        background-color: red;
    }
    .orange{
        background-color: orange;
    }
    .pink{
        background-color: pink;
    }
    
    .black{
        background-color: black;
    }
    .white{
        background-color: white;
    }
    .db1 table{
        border: solid 4px;
        border-bottom:none;
        border-radius: 10px 10px 0px 0px;
        background-color: white;
    }
    .db1 table td{
        border: solid 2px;
        font-weight: bold;
        border-radius:10px;
        padding: 0px 5px;
        /* background-image: linear-gradient(90deg ,rgb(255, 255, 236) 0%, rgb(255, 255, 120) 30%, rgb(255, 255, 120) 80%, rgb(255, 255, 225) 100% ) ; */
    }
    .db1 table td img{
        border-radius: 10px;
        border:solid 1px;
        background-color: black;
        width: 40px;
        height: 40px;
        /* margin: 0px;
       padding: 0px; */
       /* position:relative;
        top:0;
        left:0;
z-index: 1; */

    }
    .db1 table th{
        background-color: rgb(0, 17, 110);    
        color: white;
        border-radius: 7px;
        padding: 5px;
        white-space: nowrap;
    }
    
    .db1 table .datarow{
        background-color: rgb(255, 255, 71);

        height: 40px;
    }
    .db1 table .selectedrow {
        background-color: orange;
    }

    .db1 h2{

        border: solid 4px;
        
        border-radius: 0px 0px 10px 10px;
        margin:0px;
        padding: 0px;
        font-size: 1.2rem;
    }

    .db2{
       

    }

    .db2 .form{
        background-color: white;
        /* box-shadow: 0px 0px 20px black; */
        border-radius: 20px;
        /* min-width:350px; */
        border:  solid 4px white  ;
        display: flex; /* align .data|.btn */
    }

    .form .data{
        font-size: 1.2rem;
        /* margin-left:10px;
        margin-right:10px; */
        color:black;
    }
    .form .data table td{
        /* border-collapse: collapse; */
        padding:9px;
        border-radius: 20px 0px 0px 20px;

    }
    .form .data table tr td{
        background-color: rgb(196, 196, 196);
    }
    .agetr td{
        border-bottom: solid 4px white;
        border-top: solid 4px white;
    }

    .form .data table img{
        min-width: 250px; max-width: 250px;
        min-height: 250px;max-height: 250px;
        background-color:gray;
        border: solid 1px;
        border-radius: 10px;
    }
    .form .data table input{
        background-color:white;
        height: 130%;
        width:100%;
        border-radius: 10px;
        font-size: 1.2rem;
    }

    .form .btn{
        background-color: rgb(73, 73, 73);
        /* background-image: linear-gradient(90deg, rgb(0, 0, 0) 30%,rgb(128, 128, 128)) ; */
        border-radius: 0px 20px 20px 0px;
        border-left:solid 1px black;
        overflow: hidden;
        width:15%;
        display: grid; /* align buttons */
        grid-template-columns: 0.5fr;
    }
    .form .btn div{
        border-radius: 10px;
        transition-property: transform;
        transition-duration: 250ms;
        border: solid 2px;
        background-repeat: no-repeat;
        background-position: 90% center;
        margin-left:-100%;
    }
    .form .btn div:hover{
        transform: translateX(25%);
    }

    .btn .post{
        background-color: rgb(107, 221, 72);
        background-image: url("C:\Users\MED\Desktop\AJAX Paradise\public\post.jpg");
    }
    .btn .put{
        background-color: rgb(87, 72, 221);  
        background-image: url("C:\Users\MED\Desktop\AJAX Paradise\public\put.jpg");
    }
    .btn .delete{
        background-color:rgb(245, 57, 58);
        background-image: url("C:\Users\MED\Desktop\AJAX Paradise\public\delete.jpg");
    }
    
    img{
        object-fit: contain;
        vertical-align: bottom;
    }

    /*-------------- animate popup--(using @keyframes) -------------*/
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
    /*-------------- animate tables--(using @keyframes) -------------*/
    @keyframes anim2{
        0%{transform: translateX(-100px); opacity: 0;}
    }
    .table-enter-active{
        animation: anim2 300ms ease-in;
    }
    .table-move{ /* the rows that automatically move down when row added */
        transition: transform 300ms ease-in;
    }
    .table-leave-active{ /* not having the leaving row else table will have limit+1 and pushes down title of next DB */
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
</style>
