const { mysql } = require("../config/configMysql");
const sql = require('mysql');

const connection = sql.createConnection(mysql);

function getUsername(username){
    connection.connect(err => { if (err)  throw err })
    return new Promise((resolve, reject) => {
        
    })
    
}