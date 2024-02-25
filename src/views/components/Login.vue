<template >
    <button @click="flogin">Log In</button> <br>
    <button @click="flogout">Log Out</button>
</template>

<script>
import Swal from 'sweetalert2'

export default{
    emits:['login', 'logout'],

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
                    this.$emit('login', username, password);
                },
            });
        },

        flogout(){
            this.$emit('logout');
        }
    }
}
</script>

<style>
    body { font-family: sans-serif; }
</style>