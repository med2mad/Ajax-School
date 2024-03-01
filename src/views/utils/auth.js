const axios = require('axios');

async function flogin (body, Swal, user){
    const response = await axios.post('http://localhost:5010/auth/login/', body);
    if (response.data.user) {
        user.id = response.data.user.id;
        user.name = response.data.user.username;
        user.photo = response.data.user.userphoto;
        localStorage.setItem('token', response.data.token);
        return true;
    }
    
    Swal.showValidationMessage(`Wrong UserName or Password`);
    return false;
}

module.exports = {flogin}