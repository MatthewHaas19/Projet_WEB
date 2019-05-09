const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');
const bcrypt = require('bcrypt')
const saltRounds = 10;



const db = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password: 'root',
  database: 'projet'
});

db.connect((err) => {
  if(err){
    throw err;
  }
  console.log('MySql Connected')
})

const app = express()

app.use(bodyParser.json())

app.post('/api/login', async (req, res) => {
  const {username, password} = req.body
  console.log(username, password)

  var sql = 'SELECT * FROM users WHERE email = ?'

  let query = db.query(sql,username, (err,result) => {
    if (err) throw err;
    console.log(result)
    if (!result.length) {
      console.log("inccorect email")
      res.json({
        success: false,
        message: "incorrect email"
      })
    } else {
      const hash = result[0].password.toString();
      bcrypt.compare(password,hash, function(err,response){
        if(response === true) {
          console.log("logging you in")
          res.json({
            success: true,
            message: "correct details"
          })
        }else{
          console.log("inccorect password")
          res.json({
            success: false,
            message: "inccorect password"
          })
        }
      })
    }
  })
})


app.post('/api/register',async (req,res) => {

  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email
  const password = req.body.password
  const phone = req.body.phone

  bcrypt.hash(password,saltRounds,(err,hash) => {
    console.log(password)
    console.log(hash)
    var sql = 'SELECT * FROM users WHERE email = ' + mysql.escape(email);

    let query = db.query(sql, (err,result) => {
      if (err) throw err;
      if(result.length){
        res.json({
          success: false,
          message: "email already taken"
        })
        return;
      }
      else{
        sql = 'INSERT INTO users (firstname,lastname,email,password,phone) VALUES (?, ?, ?, ?, ?)';
        query = db.query(sql, [firstname,lastname,email,hash,phone], (err,result) => {
          if(err) throw err;
          console.log(result);
          res.json({
            success: true,
            message: "Welcome !"
          })
          return;
        })
      }
    })
  })
})

app.listen(1234, () => console.log('Serveur listening at 1234'))
