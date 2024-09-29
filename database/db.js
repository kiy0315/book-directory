const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Book',
    dateStrings : true
    
})

connection.connect((err) => {
    if (err) {
        console.error('MySQL 연결에 실패했습니다:', err);
        return;
    }
    console.log('MySQL에 성공적으로 연결되었습니다.');
});


module.exports = connection;