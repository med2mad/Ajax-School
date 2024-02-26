<template>
    <button @click="flogin">Log In</button> <br>
    <button @click="flogout">Log Out</button>
    <a href="html/signup">Create an Account</a>
    {{userid}}
    {{username}}
    <img :src="'uploads/'+userphoto" class="userphoto"/>
</template>

<script>
import Swal from 'sweetalert2'

export default{
    emits:['flogin', 'flogout'],

    props:{
        userid:0, username:'', userphoto:''
    },

    methods:{
        flogin(){
            Swal.fire({
                title: 'Login Form',
                html:  `<input type="text" id="username" class="swal2-input" placeholder="Username">
                        <input type="password" id="password" class="swal2-input" placeholder="Password">`,
                confirmButtonText: 'Log in',
                focusConfirm: false,
                didOpen: () => {
                    const popup = Swal.getPopup()
                    const usernameInput = popup.querySelector('#username')
                    const passwordInput = popup.querySelector('#password')
                    usernameInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
                    passwordInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
                },
                preConfirm: () => {
                    const popup = Swal.getPopup()
                    const username = popup.querySelector('#username').value
                    const password = popup.querySelector('#password').value
                    if (!username || !password) {
                        Swal.showValidationMessage(`Please enter username and password`)
                    }
                    this.$emit('flogin', 'http://localhost:5010/mysql?_limit=1&_skip=0&name='+username+'&password='+password);
                },
            });
        },

        flogout(){
            this.$emit('flogout');
        },

        fsignup(){
            
        },
    }
}
</script>

<style>
    body { font-family: sans-serif; }
    .userphoto {width:50px;}
</style>