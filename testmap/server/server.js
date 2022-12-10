const express    = require('express');
const mysql      = require('mysql');
const dbconfig   = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();
const path = require('path')
var cors = require('cors')
app.use(cors())


// configuration =========================s
app.set('port', process.env.PORT || 3001);

app.get('/', (req, res) => {
  
});

app.get('/typhoon', (req, res) => {
  connection.query('SELECT * from typhoon', (error, rows) => {
    if (error) throw error;
    console.log('data :  ', rows);
    res.send(rows);
  });
});

app.get('/earthquake', (req, res) => {
  connection.query('SELECT * from earthquake', (error, rows) => {
    if (error) throw error;
    console.log('data :  ', rows);
    res.send(rows);
  });
});

app.get('/heavyrain', (req, res) => {
  connection.query('SELECT * from heavyrain', (error, rows) => {
    if (error) throw error;
    console.log('data :  ', rows);
    res.send(rows);
  });
});

app.get('/heavysnow', (req, res) => {
  connection.query('SELECT * from heavysnow', (error, rows) => {
    if (error) throw error;
    console.log('data :  ', rows);  
    res.send(rows);
  });
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});