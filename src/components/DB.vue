<template>
    <transition>
        <Popup v-if="showpopup" @close="this.showpopup=false" :text="popuptext" />
    </transition>
    <div class="title"> <img v-if="!fake" :src="title" class="titleFake" alt="title"> <div v-else class="titleFake"> <p>Fake API<br/><span>jsonplaceholder.typicode.com</span></p> </div> </div>
    
    <div class="db">

        <div class="db1">
            <div v-if="bucket.a && bucket.a.length===0">
                <h2>No Data !! </h2>
            </div>
            <div v-else>
                <div v-if="bucket.a" >
                    <form id="form">
                    <table cellspacing="4">
                        <tr><th v-if="!fake" class="noback"></th><th  class="radio">#</th><th>User Id</th><th>Name</th><th v-if="!fake">Age</th><th v-if="!fake">Photo</th></tr>
                        <tr v-for="user in bucket.a" :class="{selected:user[_id]==selectedId, notselected:user[_id]==selectedId}" class="datarow" :key="user[_id]" @click="selectUser(user[_id]);">
                            <td v-show="!fake" class="radio"> <input type="radio" name="db" v-model="selectedId" :value="user[_id]"> </td>
                            <td></td><td>{{user[_id]}}</td> <td :ref="'trName'+user[_id]">{{user.name}}</td> <td v-if="!fake" :ref="'trAge'+user[_id]">{{user.age}}</td>
                            <td v-if="!fake"><img v-show="user.photo" :src="'./uploads/'+user.photo" :alt="'photo'+user[_id]" :ref="'trImg'+user[_id]"></td>
                        </tr>
                    </table>
                    </form>
                </div>
                <div v-else>Loading ....</div>

                <h2>
                    [{{bucket.timeF + 'ms'|| 'Calculating ...'}}]
                </h2>
            </div>
        </div>

        <div class="db2">
            <div class="flex div" v-if="!fake">
                <table cellpadding="10">
                    <tr> <td>Name:</td> <td><input type="text" v-model="vname" name="name" autocomplete="off" spellcheck="false"></td> </tr>
                    <tr class="age"> <td>Age:</td> <td><input type="number" v-model="vage" name="age" autocomplete="off"  onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'" ></td></tr>
                    <tr>
                    <td colspan="2">
                        Photo: <br>
                        <input type="file" class="custom-file-input" ref="inpfile" accept="image/*" @change="onFileChange"><br>
                        <img ref="img" alt="img" class="img"><br>
                        <button @click="remove">remove</button>
                    </td>
                    </tr>
                </table>
                <div class="btn">
                    <div class="post" @click="handlePost"></div>
                    <div class="put" @click="handlePut"></div>
                    <div class="delete" @click="handleDelete"></div>
                </div>
            </div>
            <div v-else class="flex div"> jsonplaceholder.typicode.com</div>
        </div>

    </div>
</template>

<script>
import axios from 'axios' //upload photos

export default{
    props: { title:{type:String}, _id:{type:String}, fake:{type:Boolean}, uri:{type:String},  },

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
                        this.bucket.a[i].name = this.vname;
                        this.bucket.a[i].age = this.vage;
                        this.bucket.a[i].photo = this.multerRandomPhotoName;
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
            if (!Number.isInteger(this.vage)){this.vage = Number.parseInt(this.vage);}
            
            if (this.vname==="" || this.vage===""){this.popuptext='Insert Data !';}
            else if (!Number.isInteger(this.vage) || this.vage<0){this.popuptext='Insert Positive Integer Age !'; }
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
        background-color:#42b983;
        border: solid black;
        margin-top: 40px;
        height: 15vh;
        display:flex;
        padding: 5px;
    }
    .title img{
        height: 100%;
    }
    .title .titleFake{
        margin: auto;
        font-size: 7vh;
        text-align: center;
    }
    .age{
        border-top: solid 1px;
        border-bottom: solid 1px;
    }

    .db{
        display: flex;
        gap: 10px;
    }

    .db1 table{
        border:solid 4px;
    }
    .db1 table td{
        border: solid 2px;
        /* background-color: white; */
        font-weight: bold;
    }
    .db1 table th{
        background-color: rgb(0, 17, 110);    
        color: white;
        border: none;
        font-size: 1rem;
        padding: 10px 10px;
    }
.radio{
        background-color: rgb(0, 17, 110);    
        color:white;
         padding: 10px 10px;
}
    .selected{
        border-color:yellow;
        background-color: yellow;
    }
    .db1 table .selected{
        border-color:yellow;
    }
        .notselected{
        border-color:white;
    }

    .db1 .datarow{
        height: 50px;
        background-color: yellow;
        border-color:yellow;
    }
    .db1 .datarow td{
        padding: 0px;
    }
    .db1 .datarow td img{
        border-radius: 20px;
        border: solid 2px;
        background-color: black;
        width: 50px;
        height: 50px;
    }
.db1 table .noback{
   background-color: inherit;
}
    .db2{
        background-image: linear-gradient(45deg , gray 25% , rgb(168, 168, 236) 50%, gray  ) ;
        border-radius: 10px;
        width:500px;
        height:500px;
        display: flex;
    }
    .db2 .div{
        margin: auto;
    }
    .db2 table{
        border-collapse: collapse;
    }
    .db2 .flex{
        display: flex;
        width:75%;
        background-color: black;
        border : solid 1px;
        border-radius: 20px;
    }

    .db2 table td .img{
        min-width: 250px;max-width: 250px;
        min-height: 250px;max-height: 250px;
        background-color:rgb(112, 112, 112);
        border: solid 1px;
        border-radius: 10px;
    }
    
    .btn{
        background-color: rgb(112, 112, 112);
        border-radius:20px;
        border-left:solid 1px;
        overflow: hidden;
        display: grid;
        grid-template-columns: 0.5fr;
        width:20%;
    }
    .btn div{
        border-radius: 10px;
        margin-left:-100%;
        transition-property: transform;
        transition-duration: 250ms;
        border: solid 2px;
    }
    .btn div:hover{
        transform: translateX(25%);
    }

    .btn .post{
        background-color: rgb(107, 221, 72);
        background-image: url("C:\Users\MED\Desktop\AJAX Paradise\public\post.jpg");
        background-repeat: no-repeat;
        background-position: 90% center;
    }
    .btn .put{
        background-image: url("C:\Users\MED\Desktop\AJAX Paradise\public\put.jpg");
        background-repeat: no-repeat;
        background-position: 90% center;
        background-color: rgb(87, 72, 221);  
    }
    .btn .delete{
        background-image: url("C:\Users\MED\Desktop\AJAX Paradise\public\delete.jpg");
        background-repeat: no-repeat;
        background-position: 90% center;
        background-color:rgb(245, 57, 58);
    }

    td{
        border-radius:10px;
    }
    img{
        object-fit: contain;
        vertical-align: bottom;
    }
    p{
        margin: 0;
    }
    p span {
        font-size: 75%;
        font-weight: bold;
    }

    /*-------------- animate popup--(using @keyframes) -------------*/
    @keyframes anim{
        0%{transform: translateY(-50px); opacity: 0;}
        50%{transform: translateY(10px); opacity: 1;}
        100%{transform: translateY(0); opacity: 1;}
    }
    .v-enter-active{
        animation: anim;
        animation-duration: 250ms;
    }

    @keyframes anim2{
        100%{transform: translateY(-25px); opacity: 0;}
    }
    .v-leave-active{
        animation: anim2;
        animation-duration: 150ms;
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
