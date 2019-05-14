const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("../server.js").bcrypt;

const User = require("../models/User");
users.use(cors());

process.env.SECRET_KEY = 'secret';

users.post('/register',(req,res) => {
  const userData = {
    firstname : req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  };

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if(!user){
      const hash = bcrypt.hashSync(userData.password, 10);
      userData.password = hash;
      User.create(userData).then(user => {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        });
        res.json({token:token})
      }).catch(err => {
        res.send('error: ' + err)
      })
    }else{
      res.json({error: 'User already exists'})
    }
  }).catch(err => {
    res.send('error: ' + err)
  })
});

users.post('/login', (req,res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if(!user){
      res.json({error: 'Incorrect Details'})
    }
    if(bcrypt.compareSync(req.body.password, user.password)){
      let token = jwt.sign(user.dataValues,process.env.SECRET_KEY, {
        expiresIn: 1440
      });
      res.json({token:token})
    }else{
      res.json({error: 'Incorrect Details'})
    }
  }).catch(err => {
    res.send('error: ' + err)
  })
});

users.get('/profile',(req,res) => {
  console.log(req.headers['authorization']);
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

  console.log(decoded)
  User.findOne({
    where: {
      id: decoded.id
    }
  }).then(user => {
    if(user) {
      res.json(user)
    }else{
      res.send('User does not exists')
    }
  }).catch(err => {
    res.send('error ' + err)
  })
});


module.exports = users;
