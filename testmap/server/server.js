const express    = require('express'); // express 라이브러리 연동
const mysql      = require('mysql'); // mysql 연동
const dbconfig   = require('./config/database.js');
const connection = mysql.createConnection(dbconfig); // mysql 내 db 연동

const app = express();
var cors = require('cors')
app.use(cors()) //cors 오류 해결

app.set('port', process.env.PORT || 3001); // port : 3001로 서버 구동

app.get('/', (req, res) => {
  
});

// 태풍에 대한 자연재해 데이터를 불러온당.
app.get('/typhoon', (req, res) => {
  // 테이블 컬럼들 즉 년도를 가져온다.
  let sql1 = "SELECT  COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'mytabletyphoontest';"
  
  // 자연재해 피해량 가져온다.
  let sql2 = "select * from mytabletyphoontest;"

  connection.query(sql1 + sql2 , (error, colums) => { // sq1,sql2 동시에 넣기
    if (error) throw error
    console.log(colums) // 배열로 colums[0] = sql1, colums[1] = sql2 저장됨. 
    res.send(colums)
  })
});

// 지진에 대한 자연재해 데이터를 불러온당.
app.get('/earthquake', (req, res) => {
  let sql1 = "SELECT  COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'earthquake';" 
  let sql2 = "select * from earthquake;" 
  connection.query(sql1 + sql2, (error, rows) => {
    if (error) throw error;
    console.log('data :  ', rows);
    res.send(rows);
  });
});

// 폭우에 대한 자연재해 데이터를 불러온당.
app.get('/heavyrain', (req, res) => {
  let sql1 = "SELECT  COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'heavyrain';"
  let sql2 = "select * from heavyrain;"
  connection.query(sql1 + sql2, (error, rows) => {
    if (error) throw error;
    console.log('data :  ', rows);
    res.send(rows);
  });
});

// 폭설에 대한 자연재해 데이터를 불러온당.
app.get('/heavysnow', (req, res) => {
  let sql1 = "SELECT  COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'heavysnow';"
  let sql2 = "select * from heavysnow;"
  connection.query(sql1 + sql2, (error, rows) => {
    if (error) throw error;
    console.log('data :  ', rows);  
    res.send(rows);
  });
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});