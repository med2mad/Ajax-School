<template>
    <Popup v-if="showpopup" @close="this.showpopup=false" :text="popuptext"/>
    <h2 class="title">
        {{title}}
        <div v-if="!fake">
            Name: <input type="text" v-model="vname" name="name" autocomplete="off" spellcheck="false"> | Age: <input type="number" v-model="vage" name="age" autocomplete="off"> <br>
            Photo: <input type="file" class="custom-file-input" ref="inpfile" accept="image/*" @change="onFileSelected"> <img src="" ref="img" alt="img" width="100" height="100" > <button @click="handleRemove">remove</button> <br>
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
                <tr><th v-if="!fake"></th><th>#</th><th>User Id</th><th>Name</th><th v-if="!fake">Age</th><th v-if="!fake">Photo</th></tr>
                <tr v-for="user in bucket.a" :class="{selected:user[_id]==selectedId}" :key="user[_id]" @click="selectUser(user[_id]);">
                    <td v-show="!fake"> <input type="radio" name="db" v-model="selectedId" :value="user[_id]"> </td>
                    <td> -</td><td>{{user[_id]}}</td> <td :ref="'trName'+user[_id]">{{user.name}}</td> <td v-if="!fake" :ref="'trAge'+user[_id]">{{user.age}}</td>
                    <td v-if="!fake"><img width="50" height="50" :src="'./uploads/'+user.photo" :alt="'photo'+user[_id]" :ref="'trImg'+user[_id]"></td>
                </tr>
            </table>
            </form>
        </div>
        <div v-else>Loading ....</div>

        <h2>
            [{{timeA + 'ms Asynchronously'|| 'Calculating ...'}}] | 
            [{{timeS + 'ms Synchronously'|| 'Calculating ...'}}]
        </h2>
    </div>
</template>

<script>
import axios from 'axios' //upload photos

export default{
    props: { title:{type:String}, _id:{type:String}, fake:{type:Boolean}, uri:{type:String},  },

    emits:['mountGet', 'mountGetw', 'clickPost', 'clickPut', 'clickDelete'],
 
    data(){return{
                bucket:{a:'', s:''},
                timeA:'', timeS:'',
                selectedId:'',
                vname:'', vage:'', photoRandomName:'',
                showpopup:false, popuptext:'', 
                }
            },

    methods:{
        async handlePost(){
            if(await this.dataCheck()){this.showpopup = true;}
            else{
                this.$emit('clickPost', {"name":this.vname, "age":this.vage, "photo":this.photoRandomName}, this.bucket);
                this.handleRemove();
                }
        },
        async handlePut(){
            if(!this.selectedId){this.popuptext='select'; this.showpopup = true;}
            else if(await this.dataCheck()){this.showpopup = true;}
            else{
                    this.$emit('clickPut', this.selectedId, {"name":this.vname, "age":this.vage, "photo":this.photoRandomName});
                    
                    this.$refs['trName'+this.selectedId][0].innerHTML = this.vname;
                    this.$refs['trAge'+this.selectedId][0].innerHTML = this.vage;
                    this.$refs['trImg'+this.selectedId][0].src = this.$refs.img.scr;
                    
                    
                    
                    // this.$refs['photo'+this.selectedId][0].innerHTML = this.photoRandomName;
                }
        },
        handleDelete(){
            if(!this.selectedId){this.popuptext='select';this.showpopup = true;}
            else{this.$emit('clickDelete', this.selectedId);}
        }, 

        selectUser(id){
            this.selectedId = id;
            const src = this.$refs['trImg'+this.selectedId][0].src;

            this.vname = this.$refs['trName'+this.selectedId][0].innerHTML;
            this.vage = this.$refs['trAge'+this.selectedId][0].innerHTML;
            this.$refs.img.src = src;
            this.photoRandomName = src.split("/")[src.split("/").length-1];
       },
        handleRemove(){
            this.vname='';
            this.vage='';
            this.photoRandomName='';
        },
        onFileSelected(e){
            if (e.target.files[0]) { //e.target.files is the same as this.$refs.inpfile.files
                this.$refs.img.src = URL.createObjectURL(e.target.files[0]);
                this.photoRandomName = URL.createObjectURL(e.target.files[0]);
            }
        },

        async dataCheck(){
            this.popuptext='';
            
            if(this.vage!==""){this.vage=Number.parseInt(this.vage)}

            if (this.vname==="" || this.vage===""){this.popuptext='Insert Data !';}
            else if (!Number.isInteger(this.vage) || this.vage<0){this.popuptext='Insert Positive Integer Age !'; }
            else if (this.$refs.inpfile.files[0]) {
                const fd = new FormData();
                fd.append('photo', this.$refs.inpfile.files[0] , this.$refs.inpfile.files[0].name)
                try {
                    const response = await axios.post('http://localhost:5999/upload',fd);
                    this.photoRandomName = response.data.newPhotoName;
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
