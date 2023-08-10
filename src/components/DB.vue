<template>
    <Popup v-if="showpopup" @close="this.showpopup=false" :text="popuptext"/>
    <h2 class="title">
        {{title}}
        <div v-if="!fake">
            Name: <input type="text" v-model="vname" name="name" autocomplete="off" spellcheck="false"> | 
            Age: <input type="number" v-model="vage" name="age" autocomplete="off"  onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'" > <br>
            Photo: <input type="file" class="custom-file-input" ref="inpfile" accept="image/*" @change="onFileChange"> <img ref="img" alt="img" width="100" height="100"> <button @click="remove">remove</button> <br>
            <button class="post" @click="handlePost">POST</button> | <button class="put" @click="handlePut">PUT</button> | <button class="delete" @click="handleDelete">DELETE</button>
        </div>
        <div v-else>jsonplaceholder.typicode.com</div>
    </h2>
    <div v-if="bucket.a && bucket.a.length===0">
        <h2>No Data !! </h2>
    </div>
    <div v-else>
        <div v-if="bucket.a" >
            <form id="form">
            <table border="solid">
                <tr><th v-if="!fake"></th><th>#</th><th>User Id</th><th>Name</th><th v-if="!fake">Age</th><th v-if="!fake">Photo</th></tr>
                <tr v-for="user in bucket.a" :class="{selected:user[_id]==selectedId}" :key="user[_id]" @click="selectUser(user[_id]);">
                    <td v-show="!fake"> <input type="radio" name="db" v-model="selectedId" :value="user[_id]"> </td>
                    <td> -</td><td>{{user[_id]}}</td> <td :ref="'trName'+user[_id]">{{user.name}}</td> <td v-if="!fake" :ref="'trAge'+user[_id]">{{user.age}}</td>
                    <td v-if="!fake"><img v-show="user.photo" width="50" height="50" :src="'./uploads/'+user.photo" :alt="'photo'+user[_id]" :ref="'trImg'+user[_id]"></td>
                </tr>
            </table>
            </form>
        </div>
        <div v-else>Loading ....</div>

        <h2>
            [{{bucket.timeF + 'ms'|| 'Calculating ...'}}] | 
        </h2>
    </div>
</template>

<script>
import axios from 'axios' //upload photos

export default{
    props: { title:{type:String}, _id:{type:String}, fake:{type:Boolean}, uri:{type:String},  },

    emits:['mountGet', 'mountGetw', 'clickPost', 'clickPut', 'clickDelete'],
 
    data(){return{
                bucket:{timeF:'',time0:0, a:'', s:''},
                timeS:0,
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
            if(!this.selectedId){this.popuptext='select'; this.showpopup = true;}
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
        handleDelete(){
            if(!this.selectedId){this.popuptext='select';this.showpopup = true;}
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
    }

    h2 button{
    font-weight: bold;
    color: #2c3e50;
    padding: 4px 7px;
    border-radius: 10px;
    font-size: 75%;
        margin: 1px;
    }

    h2 .post{
    background-color: rgb(107, 221, 72);
    }
    h2 .put{
    background-color: rgb(87, 72, 221);  
    }
    h2 .delete{
    background-color:rgb(221, 72, 72);
    }

    .selected{
    background-color:yellow;
    }

    img{
    object-fit:contain ;
    }

    /* # automatically numbered rows */
    table {
    counter-reset: rowNumber -1;
    }
    table tr {
    counter-increment: rowNumber;
    }
    table tr td:nth-child(2)::before {
    content: counter(rowNumber);
    }
</style>
