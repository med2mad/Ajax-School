const axios = require('axios');

async function flogin (body, Swal, user){
    const response = await axios.post('http://localhost:5010/auth/login/', body);
    if (response.data.length>0) {
        user.id = response.data[0].id;
        user.name = response.data[0].username;
        user.photo = response.data[0].userphoto;
        return true;
    }else{
        Swal.showValidationMessage(`Wrong UserName or Password`);
        return false;
    }


        // const x = await bcrypt.compare(req.body.pass, user.pass);
        // if(!x){return res.send("wrong pass");}
        // const token = jwt.sign({"name":user.name, "pass":user.pass}, 'secret');
        // res.send({"message":'welcome back', "user":user, "token":token});

}

module.exports = {flogin}