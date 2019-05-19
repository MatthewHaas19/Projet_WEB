const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("../server.js").bcrypt;

const User = require("../models/User");
const Review = require("../models/Review");
users.use(cors());

process.env.SECRET_KEY = 'secret';

users.post('/register',(req,res) => {
  const userData = {
    firstname : req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    city: req.body.city,
    address: req.body.address,
    code: req.body.code,
    image: 'https://pixeltime.ro/profile.jpg'
  };
      const hash = bcrypt.hashSync(userData.password, 10);
      userData.password = hash;
      User.create(userData).then(user => {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        });
        res.json({token:token})
      }).catch(err => {
        res.json({error: 'User already exists'})
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


users.get('/userById/:id',(req,res) => {

  User.findOne({
    where: {
      id: req.params.id
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

users.post('/user-review', (req,res) => {
  const reviewData = {
    Content: req.body.content,
    idUser: req.body.idUser,
    idWorker: req.body.idWorker,
    Type: 'user'
  };
  Review.Create(reviewData).then(result => {
    res.json(result)
  })
});


users.put('/modify/:id',(req,res) => {
console.log(req.params.id,req.body.img)
  User.update({
      image: req.body.img,
    },
    {
      where: {
        id: req.params.id
      }
    }).then(user => {
    console.log(user)
    res.json(user)
  }).catch(err => {
    console.log(err)
  })
});


users.get('/user-reviews/:id',(req,res) => {

  Review.findAll({
    limit: 5,
    where: {
      idUser: req.params.id,
      Type: 'worker'
    },
    order: [[ 'idReview', 'DESC']]
  }).then(review => {
    if(review) {
      res.json(review)
    }else{
      res.send('No review')
    }
  }).catch(err => {
    res.send('error ' + err)
  })
});

module.exports = users;
