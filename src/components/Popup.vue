<template>
    <div class="popup" @click.self="this.$emit('close')">
        <div class="innerpopup">
            <h1>Insert Data !!!</h1>
        </div>
    </div>
</template>


<script>



export default{
    emits:['close']
}
</script> 


<style>
.popup{
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background-color: rgba(128, 128, 128, 0.637);
    
    display: flex;
    align-items: center;
    justify-content: center;
}
.innerpopup{
    background-color:rgb(255, 227, 227);
    border:red solid;
    padding: 32px;
    color: #2c3e50;
        border-radius: 10px;
}
</style>