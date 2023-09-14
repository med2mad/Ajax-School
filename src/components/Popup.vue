<template>
    <div class="popup" @click.self="this.$emit('close')">
        <div class="innerpopup">
            <h1>{{text}}</h1>
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
    font-family: JlsspacegothicRnc-n2zY;
    src: url('C:\Users\MED\Desktop\AJAX Paradise\public\fonts\JlsspacegothicRnc-n2zY.otf');
}
@font-face {
    font-family: Roboto-Light;
    src: url('C:\Users\MED\Desktop\AJAX Paradise\public\fonts\Roboto-Light.ttf');
}
@font-face {
    font-family: Rajdhani-Light;
    src: url('C:\Users\MED\Desktop\AJAX Paradise\public\fonts\Rajdhani-Light.ttf');
}
@font-face {
    font-family: Rajdhani-Bold;
    src: url('C:\Users\MED\Desktop\AJAX Paradise\public\fonts\Rajdhani-Bold.ttf');
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
    border:red solid;
    padding: 32px;
    color: #2c3e50;
    border-radius: 10px;

    /* background-color: white;
    border:rgb(118, 0, 44) solid;
    color: black; */
}
.innerpopup h1{
    font-family: Rajdhani-Bold, sans-serif;
    font-weight: bold;
}

/* @keyframes anim {
    0%{transform: translateY(-25px); opacity: 0;}
    100%{transform: translateY(0); opacity: 1;}
}
.innerpopup{
    animation: anim 250ms;
} */
</style>