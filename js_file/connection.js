var mysql = require('mysql');

var pool = mysql.createPool({
  user: 'epiz_33966544',
  password: '08pB1R8QR9NL',
  host: 'sql111.epizy.com',
  port: '3306',
  database: 'epiz_33966544_animalsaverinfo',
  waitForConnections : true,
  connectionLimit : 4 //連線數上限
})

pool.getConnection((err, connection) => {

  if (err) {
    console.log(err)
  } else {
    connection.query( 'SELECT * FROM user', 
      function(err, rows) {
        //callback function
        console.log(rows)
        // console.log(err)
        // 釋放連線
        connection.release();
    });
  }
});
