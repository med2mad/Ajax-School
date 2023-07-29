<template>
    <Popup v-if="showpopup" @close="closepopup" :text="popuptext"/>
    <h2 class="title">
        {{title}}
        <div v-if="!fake">
            Name: <input type="text" v-model="vname" name="name" autocomplete="off"> | Age: <input type="number" v-model="vage" name="age" autocomplete="off"> <br>
            <button href="noajax.html" class="post" @click="handlePost">POST</button> | <button class="put" @click="handlePut">PUT</button> | <button class="delete" @click="handleDelete">DELETE</button>
        </div>
        <div v-else>Fake API (No POST/PUT/DELETE)</div>
    </h2>
    <div v-if="bucket.a && bucket.a.length===0">
        <h2>No Data !! </h2>
    </div>
    <div v-else>
        <div v-if="bucket.a" >
            <form id="form">
            <table>
                <tr v-for="row in bucket.a" :key="row[_id]">
                    <td v-if="!fake"> <input type="radio" name="db" :id="row[_id]" v-model="rowId" :value="row[_id]"> </td>
                    <label :for="row[_id]">
                        <td>Id : </td> <td>{{row[_id]}}</td> <td>Name : </td> <td>{{row.name}}</td> 
                        <td>{{!fake?'Age : ':''}}</td><td>{{!fake?row.age:''}}</td>
                    </label>
                </tr>
            </table>
            </form>
        </div>
        <div v-else >Loading ....</div>

        <h2>
            [{{timeA || 'Calculating ...'}}ms Asynchronously] | 
            [{{timeS || 'Calculating ...'}}ms Synchronously]
        </h2>
    </div>
</template>

<script>
export default{
    props: { title:{type:String}, _id:{type:String}, fake:{type:Boolean}, },

    emits:['mountGet', 'mountGetw', 'clickPost', 'clickPut', 'clickDelete'],

    data(){return{
                bucket:{a:'', s:''},
                timeA:'', timeS:'',
                rowId:'',
                vname:'', vage:'',
                showpopup:false, popuptext:'', 
                }
            },

    methods:{
        handlePost(){
            if(this.dataCheck()){this.showpopup = true}
            else{this.$emit('clickPost', this.vname, this.vage)}
        },

        handlePut(){
            this.popuptext='';
            if(!this.rowId){this.popuptext='select';}
            if(this.popuptext || this.dataCheck()){this.showpopup = true}//this.popuptext || for needing to select
            else{this.$emit('clickPut', this.rowId, this.vname, this.vage)}
        },
        
        handleDelete(){
            this.popuptext='';
            if(!this.rowId){this.popuptext='select';}
            if(this.popuptext){this.showpopup = true}//this.popuptext || for needing to select
            else{this.$emit('clickDelete', this.rowId)}
        }, 

        closepopup(){this.showpopup = false},
        
        dataCheck(){
            this.popuptext='';
            if (this.vname==="" || this.vage===""){this.popuptext='Insert Data !'; return true;}
            else if (!Number.isInteger(this.vage) || this.vage==="e" || this.vage<0){this.popuptext='Insert Positive Integer Age !'; return true;}
        }
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
</style>
