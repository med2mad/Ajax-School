<template>
    <div class="popup" @click.self="this.$emit('close')">
        <div class="innerpopup">
            <h1>{{text}}</h1>
            <div @click.self="this.$emit('close')">ok</div>
        </div>
    </div>
</template>

<script>

export default{
    emits:['close'],
    props:['text']
}

</script> 

<style>
@font-face {
    font-family: Rajdhani-Light;
    src: url('C:\Users\MED\Desktop\AJAX Paradise\public\fonts\Rajdhani-Light.ttf');
}

.popup{
    position:fixed;
    top:-20px;
    left:-20px;
    bottom:-20px;
    right:-20px;
    background-color: rgba(128, 128, 128, 0.637);
    
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}
.innerpopup{
    background-color:rgb(255, 227, 227);
    padding: 32px;
    border-radius: 10px;
    border:rgb(118, 0, 44) solid 4px;
    color: black;
}
.innerpopup h1{
    font-family: Rajdhani-Light, sans-serif;
    font-weight: bold;
}

.innerpopup div{
    font-family: Rajdhani-Light, sans-serif;
    font-weight: bold;
    color: white;
    font-size: 2rem;
    border-radius: 10px;
    cursor: pointer;
    background-color: rgb(118, 0, 44);
}
</style>