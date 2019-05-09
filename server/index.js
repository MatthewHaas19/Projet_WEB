const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/Projet_WEB').then(
  (err) => console.log('Mongoose up')
)

const User = require('./models/users')

app.use(bodyParser.json())

app.post('/api/login', async (req, res) => {
  const {username, password} = req.body
  const email = username
  console.log(username, password)
  const resp = await User.findOne({email,password})
  console.log(resp)
  if(!resp){
    console.log("inccorect details")
    res.json({
      success: false,
      message: "incorrect details"
    })
  }else{
    console.log("logging you in")
    res.json({
      success: true,
      message: "correct details"
    })
  }
})

app.post('/api/register', async (req,res) => {
  console.log(req.body)
  const {firstname,lastname,email,password,phone} = req.body

  const existingUser = await User.findOne({email})

  if(existingUser){
    res.json({
      success: false,
      message: "Email already in use"
    })
    return
  }

  const user = new User({
    firstname,
    lastname,
    email,
    password,
    phone
  })

  const result = await user.save()
  console.log(result)

  res.json({
    success: true,
    message: "Welcome !"
  })
} )

app.listen(1234, () => console.log('Serveur listening at 1234'))
