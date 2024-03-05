<template>
    <div>
        <button @click="fLogin">Log In</button><br>
        <button @click="fLogout">Log Out</button><br>
        <a href="html/signup.html">Create an Account</a>
    </div>
    <div>
        {{user.name}}
        <a href="html/signup.html?edit=1"><img :src="'uploads/'+(user.photo?user.photo:'profile.jpg')" class="userphoto"/></a>
    </div>
    <div>
        <a href="html/pricing.html">Uprade</a>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import { login, logout } from '../../../scripts';

export default{

    data(){return{
        user : {name:localStorage.getItem('username'), photo:localStorage.getItem('userphoto')}
    }},

    methods:{
        fLogin(){
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

                    await login({username, password}, Swal, this.user);
                },
            });
        },

        fLogout(){
            logout(this.user);
        },
    },
}
</script>

<style>
    body { font-family: sans-serif; }
    .userphoto {width:50px; height:50px; border-radius:50px; object-fit: cover;}
</style>