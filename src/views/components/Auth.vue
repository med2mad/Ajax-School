<template>
    <nav>
        <a class="user" href="javascript:void(0)" @click="profile">
            <div class="username">
                {{user.name}}
            </div>
            <div>
                <img :src="'uploads/'+(user.photo?user.photo:'profile.jpg')" class="userphoto" />
            </div>
        </a>
        <a v-if="!user.name" href="javascript:void(0)" @click="fLogin"> <div class="btn" style="width:90px">LogIn</div> </a>
        <a v-else href="javascript:void(0)" @click="fLogout"> <div class="btn" style="width:90px">LogOut</div> </a>
        <a href="javascript:void(0)" @click="fSignup"> <div class="btn" style="width:90px">SignUp</div> </a>
    </nav>
</template>

<script>
import Swal from 'sweetalert2';
import { login, logout } from './utils';

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

                    await login({username,password}, Swal, this.user);
                },
            });
        },

        fLogout(){
            logout(this.user);
        },
        fSignup(){
            window.location.href = 'html/signup.html?title=Sign Up&photo=profile.jpg';
        },

        profile(){
            if(localStorage.getItem('token'))
                window.location.href = 'html/signup.html?title=Edit Profile&photo='+(this.user.photo?this.user.photo:'profile.jpg');
            else
                this.fLogin();
        }
    },
}
</script>

<style>
    body { font-family: sans-serif; }
    .userphoto {width:50px; height:50px; border-radius:50px; object-fit:cover;}
    .user{margin: auto;}
</style>