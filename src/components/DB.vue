<template>
    <Popup v-if="showpopup" @close="this.showpopup=false" :text="popuptext"/>
    <h2 class="title">
        {{title}}
        <div v-if="!fake">
            Name: <input type="text" v-model="vname" name="name" autocomplete="off"> | Age: <input type="number" v-model="vage" name="age" autocomplete="off"> <br>
            Photo: <input type="file" accept="image/*" @change="onFileSelected"> <img id="photo" :src="selectedImgPath" alt="" width="100" height="100" > <button @click="selectedFile='';selectedImgPath='';">remove</button> <br>
            <button class="post" @click="handlePost">POST</button> | <button class="put" @click="handlePut">PUT</button> | <button class="delete" @click="handleDelete">DELETE</button>
        </div>
        <div v-else>Fake API (No POST/PUT/DELETE)</div>
    </h2>
    <div v-if="bucket.a && bucket.a.length===0">
        <h2>No Data !! </h2>
    </div>
    <div v-else>
        <div v-if="bucket.a" >
            <form id="form">
            <table border="solid">
                <tr><td></td><td>#</td><td>User Id</td><td>Name</td><td v-if="!fake">Age</td><td>Photo</td></tr>
                <tr v-for="(user,i) in bucket.a" :class="{selected:user[_id]==selectedId}" :key="user[_id]" @click="selectUser(user[_id])">
                    <td v-if="!fake"> <input type="radio" name="db" v-model="selectedId" :value="user[_id]"> </td><td v-else>X</td>
                    <td>{{i+1}}</td><td>{{user[_id]}}</td> <td>{{user.name}}</td> <td v-if="!fake">{{user.age}}</td><td>{{user.photo}}</td>
                </tr>
            </table>
            </form>
        </div>
        <div v-else>Loading ....</div>

        <h2>
            [{{timeA || 'Calculating ...'}}ms Asynchronously] | 
            [{{timeS || 'Calculating ...'}}ms Synchronously]
        </h2>
    </div>
</template>

<script>
import axios from 'axios' //to upload photos

export default{
    props: { title:{type:String}, _id:{type:String}, fake:{type:Boolean}, uri:{type:String},  },

    emits:['mountGet', 'mountGetw', 'clickPost', 'clickPut', 'clickDelete'],
 
    data(){return{
                bucket:{a:'', s:''},
                timeA:'', timeS:'',
                selectedId:'', 
                vname:'', vage:'', selectedFile:'', selectedImgPath:'',
                showpopup:false, popuptext:'', 
                }
            },

    methods:{
        async handlePost(){
            if(await this.dataCheck()){this.showpopup = true}
            else{this.$emit('clickPost', this.vname, this.vage)}
        },

        handlePut(){
            this.popuptext='';
            if(!this.selectedId){this.popuptext='select';}
            if(this.popuptext || this.dataCheck()){this.showpopup = true}//this.popuptext || for needing to select
            else{this.$emit('clickPut', this.selectedId, this.vname, this.vage)}
        },
        
        handleDelete(){
            this.popuptext='';
            if(!this.selectedId){this.popuptext='select';}
            if(this.popuptext){this.showpopup = true}//this.popuptext for needing to select
            else{this.$emit('clickDelete', this.selectedId)}
        }, 

        onFileSelected(e){
            if (e.target.files[0]) {
                this.selectedFile = e.target.files[0];
                this.selectedImgPath=URL.createObjectURL(this.selectedFile);
            }
        },

        selectUser(id){
          this.selectedId = id;
        },
        
        async dataCheck(){
            this.popuptext='';
            
            if (this.vname==="" || this.vage===""){this.popuptext='Insert Data !'; }
            else if (!Number.isInteger(this.vage) || this.vage==="e" || this.vage<0){this.popuptext='Insert Positive Integer Age !'; }
            else if (this.selectedFile) {
                const fd = new FormData();
                fd.append('photo', this.selectedFile,  this.selectedFile.name)
                try {
                    await axios.post(this.uri+'upload',fd);
                } catch (error) {
                    this.popuptext='Photo not valid !'; 
                }
            }
            
            return this.popuptext;
        },
    },

    mounted(){
        //pass empty objects by reference to get promise result(FAST) 
        let time0 = performance.now();
            this.$emit('mountGet', this.bucket);
        this.timeA = (performance.now() - time0).toFixed(2); 
        
        //get function's return value(SLOW)
        time0 = performance.now();
            (async ()=>{
                this.$emit('mountGetw', this.bucket);
            })(); //async self invoking
        this.timeS = (performance.now() - time0).toFixed(2);
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

    #photo{
        object-fit:contain ;
    }
</style>
