const axios = require('axios');

async function login (body, Swal, user){
    const response = await axios.post('http://localhost:5000/login/', body);
    if (response.data.user) {
        localStorage.setItem('token', response.data.token);

        user.name = response.data.user.username;
        user.photo = response.data.user.userphoto;
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('userphoto', response.data.user.userphoto);
    }
    else{
        Swal.showValidationMessage(`Wrong UserName or Password`);
        return false; //stop Swal from leaving
    }
}

function logout(user){
    localStorage.removeItem('token');

    user.name = '';
    user.photo = 'profile.jpg';
    localStorage.removeItem('username');
    localStorage.setItem('userphoto', 'profile.jpg');
}

module.exports = {login, logout}