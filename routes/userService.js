const connection = require("../database/db");

const loginQuery = (email, callback) => {

    connection.query('SELECT * FROM users WHERE email = ?', email,callback)
}

const joinQuery = (userInfo, callback) => {
    connection.query('INSERT INTO users (email,name,password,contact) VALUES (?,?,?,?)', userInfo, callback)
}


module.exports = {
    loginQuery,
    joinQuery
}