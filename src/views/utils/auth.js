const axios = require('axios');

module.exports.flogin = async function flogin(uri) {
    const response = await axios.get(uri);
    if (response.data.rows.length>0) {
        return {
            "id":response.data.rows[0]._id,
            "name":response.data.rows[0].name,
            "photo":response.data.rows[0].photo,
        }
    }
}