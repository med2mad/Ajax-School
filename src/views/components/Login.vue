<template>
    <button @click="login">Log In</button> <br>
    <button @click="logout">Log Out</button>
    <a href="auth/signup.html">Create an Account</a>
    {{user.id}}
    {{user.name}}
    <img :src="'uploads/'+user.photo" class="userphoto"/>
</template>

<script>
import Swal from 'sweetalert2'
import { flogin } from '../utils/auth';

export default{

    data(){return{
        user : {id:'', name:'', photo:'profile.jpg'}
    }},

    methods:{
        login(){
            Swal.fire({
                title: 'Login',
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
                preConfirm: async () => {
                    const popup = Swal.getPopup()
                    const username = popup.querySelector('#username').value
                    const password = popup.querySelector('#password').value
                    if (!username || !password) {
                        Swal.showValidationMessage(`Please enter username and password`)
                    }

                    return await flogin({username, password}, Swal, this.user);
                },
            });
        },

        logout(){
            this.user.id=''; this.user.name=''; this.user.photo='profile.jpg';
        },

        fsignup(){
            
        },
    }
}
</script>

<style>
    body { font-family: sans-serif; }
    .userphoto {width:50px; height:50px; border-radius:50px; object-fit: cover;}
</style>