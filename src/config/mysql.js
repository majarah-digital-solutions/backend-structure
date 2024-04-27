const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  port: '8889',
  user: 'root',
  password: 'root',
  database: 'adumcar',
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    console.error('خطأ في الاتصال بقاعدة البيانات: ' + err.message);
  } else {
    console.log('تم الاتصال بنجاح بقاعدة البيانات');
  }
});

module.exports = db;
