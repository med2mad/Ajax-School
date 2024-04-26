<template>
    <div>
        <button @click="fLogin">Log In</button><br>
        <button @click="fLogout">Log Out</button><br>
        <a href="html/signup.html?title=Sign Up">Create an Account</a>
    </div>
    <div @click="editUser">
        {{user.name}}
    </div>
    <div @click="editUser">
        <img :src="'uploads/'+(user.photo?user.photo:'profile.jpg')" class="userphoto"/>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import { login, logout } from './scripts/auth';

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

                    const fd = new FormData(); //with just "{username,password}" (no "fd") it needs "app.use(express.json())" in backEnd
                    fd.append('username', username);
                    fd.append('password', password);
                    await login(fd, Swal, this.user);
                },
            });
        },

        fLogout(){
            logout(this.user);
        },

        editUser(){
            if(localStorage.getItem('token'))
            window.location.href = 'html/signup.html?title=Edit Profile';
        }
    },
}
</script>

<style>
    body { font-family: sans-serif; }
    .userphoto {width:50px; height:50px; border-radius:50px; object-fit: cover;}
</style>