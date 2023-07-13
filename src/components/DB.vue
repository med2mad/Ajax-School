<template>
    <h2 class="title">
        {{title}}
        <br><button class="post" @click="this.$emit('clickPost')">POST</button> | <button class="put" @click="this.$emit('clickPut', bucket.t[0][_id])">PUT</button> | <button class="delete" @click="this.$emit('clickDelete', bucket.t[0][_id])">DELETE</button>
    </h2>
    <div v-if="bucket.t && bucket.t.length===0">
        <h2>No Data !! </h2>
    </div>
    <div v-else>
        <h2 v-if="bucket.t">[Asynchronously] : {{ bucket.t }}</h2>
        <h2 v-else>Loading .... </h2>
        <h2 v-if="bucket.w">[Synchronously] : {{ bucket.w }}</h2>
        <h2 v-else>Loading .... </h2>
    </div>
</template>

<script>
export default{
    props: { title:{type:String}, _id:{type:String} },

    emits:['mountGet', 'mountGetw', 'clickPost', 'clickPut', 'clickDelete'],

    data(){return{
                bucket:{t:'', w:''},
                }
            },

    mounted(){
        //pass empty objects by reference to get promise result(FAST) 
        this.$emit('mountGet', this.bucket);
        
        //get function's return value(SLOW)
        (async ()=>{
            this.$emit('mountGetw', this.bucket);
        })(); //async self invoking
    }
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
