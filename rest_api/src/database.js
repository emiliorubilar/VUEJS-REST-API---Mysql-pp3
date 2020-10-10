const mysql = require('mysql');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'vue-api-db'
});

db.connect();

console.log("la conexion ha sido exitosa!");

module.exports = db;