const mysql = require('mysql2');

const datacenter = mysql.createConnection({
  host: 'localhost',
  port: '8889',
  user: 'root',
  password: 'root',
  database: 'adumcar_datacenter',
  multipleStatements: true,
});

datacenter.connect((err) => {
  if (err) {
    console.error('خطأ في الاتصال بقاعدة البيانات: ' + err.message);
  } else {
    console.log('تم الاتصال بنجاح بقاعدة البيانات');
  }
});

module.exports = datacenter;
