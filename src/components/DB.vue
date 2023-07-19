<template>
    <h2 class="title">
        {{title}}
        <div v-if="!fake"><button class="post" @click="this.$emit('clickPost')">POST</button> | <button class="put" @click="this.$emit('clickPut', bucket.a[0][_id])">PUT</button> | <button class="delete" @click="this.$emit('clickDelete', bucket.a[0][_id])">DELETE</button></div>
        <div v-else>Fake API (No POST / PUT / DELETE)</div>
    </h2>
    <div v-if="bucket.a && bucket.a.length===0">
        <h2>No Data !! </h2>
    </div>
    <div v-else>
        <h2 >{{ bucket.a || bucket.s || 'Loading ....' }}</h2>
        <h2>
            [{{timeA || 'Calculating ...'}}ms Asynchronously]
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
                timeA:'', timeS:''
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
