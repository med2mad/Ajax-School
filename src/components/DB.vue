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
            <table border="solid" :id="'tbl'+title">
                <thead>
                <tr id="tr1"><th v-if="!fake"></th><th>#</th><th>User Id</th><th>Name</th><th v-if="!fake">Age</th><th v-if="!fake">Photo</th></tr>
                </thead>
                <tbody>
                <tr v-for="user in bucket.a" :class="{selected:user[_id]==selectedId}" :key="user[_id]" @click="selectUser(user[_id]);">
                    <td v-show="!fake"> <input type="radio" name="db" v-model="selectedId" :value="user[_id]"> </td>
                    <td></td><td>{{user[_id]}}</td> <td :ref="'name'+user[_id]">{{user.name}}</td> <td :ref="'age'+user[_id]" v-if="!fake">{{user.age}}</td><td :ref="'photo'+user[_id]" v-if="!fake">{{user.photo}}</td>
                </tr>
                </tbody>
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
                vname:'', vage:'', newFileName:'', //why newFileName
                selectedFile:'', selectedImgPath:'',
                showpopup:false, popuptext:'', 
                }
            },

    methods:{
        async handlePost(){
            if(await this.dataCheck()){this.showpopup = true;}
            else{this.$emit('clickPost', {"name":this.vname, "age":this.vage, "photo":this.newFileName}, this.bucket);}
        },
        async handlePut(){
            if(!this.selectedId){this.popuptext='select'; this.showpopup = true;}
            else if(await this.dataCheck()){this.showpopup = true;}
            else{
                    this.$emit('clickPut', this.selectedId, {"name":this.vname, "age":this.vage, "photo":this.newFileName});
                    
                    this.$refs['name'+this.selectedId][0].innerHTML = this.vname;
                    this.$refs['age'+this.selectedId][0].innerHTML = this.vage; //remove name att from tags
                    this.$refs['photo'+this.selectedId][0].innerHTML = this.newFileName;
                }
        },
        handleDelete(){
            if(!this.selectedId){this.popuptext='select';this.showpopup = true;}
            else{this.$emit('clickDelete', this.selectedId); this.refreshTbl+=1;}
        }, 

        onFileSelected(e){
            if (e.target.files[0]) {
                this.selectedFile = e.target.files[0];
                this.selectedImgPath=URL.createObjectURL(this.selectedFile);
            }
        },
        selectUser(id){
            this.selectedId = id;
            // let newTr = document.createElement("tr");        
            // let newTd = document.createElement("td");
            // let newTdName = document.createElement("tdName");
            // newTdName.innerHTML="";
            // newTr.append(newTdName);newTr.append(newTd);newTr.append(newTd);newTr.append(newTd);newTr.append(newTd);newTr.append(newTd);
            // let tr = document.getElementById("tr1");
            // let tbl = document.getElementById("tbl1");

            // tbl.insertBefore(newTr, tr.nextSibling);

            // let x = '<tr :class="{selected:user[_id]==selectedId}" :key="user[_id]" @click="selectUser(user[_id]);">';
            // x += '<td v-if="!fake"> <input type="radio" name="db" v-model="selectedId" :value="user[_id]"> </td>';
            // x += '<td>{{i+1}}</td><td>{{user[_id]}}</td> <td :ref="' + "'name'" + '+user[_id]">{{user.name}}</td> <td :ref="'+"'age'"+'+user[_id]" v-if="!fake">{{user.age}}</td><td :ref="'+"'photo'"+'+user[_id]" v-if="!fake">{{user.photo}}</td>';
            // x += '</tr>';

        },
        
        async dataCheck(){
            this.popuptext='';
            
            if (this.vname==="" || this.vage===""){this.popuptext='Insert Data !'; }
            else if (!Number.isInteger(this.vage) || this.vage==="e" || this.vage<0){this.popuptext='Insert Positive Integer Age !'; }
            else if (this.selectedFile) {
                const fd = new FormData();
                fd.append('photo', this.selectedFile,  this.selectedFile.name)
                try {
                    const response = await axios.post('http://localhost:5999/upload',fd);
                    this.newFileName = response.data.newPhotoName;
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

    table {
        counter-reset: row-num-1;
    }
    table tr {
        counter-increment: row-num;
    }
    table tbody tr td:nth-child(2)::before {
        content: counter(row-num);
    }
</style>
