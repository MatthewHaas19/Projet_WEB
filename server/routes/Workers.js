const express = require("express");
const workers = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("../server.js").bcrypt;

const Worker = require("../models/Worker");
const Review = require("../models/Review");
workers.use(cors());

process.env.SECRET_KEY = 'secret';

workers.post('/WorkerRegister',(req,res) => {
  const userData = {
    firstname : req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    image: 'https://pixeltime.ro/profile.jpg'
  };
      const hash = bcrypt.hashSync(userData.password, 10);
      userData.password = hash;
      Worker.create(userData).then(user => {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        });
        res.json({token:token})
      }).catch(err => {
        res.json({error: 'User already exists'})
      })
});

workers.post('/WorkerLogin', (req,res) => {
  Worker.findOne({
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

workers.get('/WorkerProfile',(req,res) => {
  console.log(req.headers['authorization']);
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

  console.log(decoded)
  Worker.findOne({
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

workers.get('/workerById/:id',(req,res) => {

  Worker.findOne({
    where: {
      id: req.params.id
    }
  }).then(worker => {
    if(worker) {
      res.json(worker)
    }else{
      res.send('Worker does not exists')
    }
  }).catch(err => {
    res.send('error ' + err)
  })
});

workers.post('/worker-review', (req,res) => {
  const reviewData = {
    idUser: req.body.idUser,
    idWorker: req.body.idWorker,
    Content: req.body.content,
    Type: 'worker'
  };
  console.log(reviewData)
  Review.create(reviewData).then(result => {
    res.json(result)
  })
});

workers.get('/worker-reviews/:id',(req,res) => {

  Review.findAll({
    where: {
      idUser: req.params.id,
      Type: 'user'
    }
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

workers.put('/modify-worker/:id',(req,res) => {
  console.log(req.params.id,req.body.img)
  Worker.update({
      image: req.body.img,
    },
    {
      where: {
        id: req.params.id
      }
    }).then(worker => {
    console.log(worker)
    res.json(worker)
  }).catch(err => {
    console.log(err)
  })
});

module.exports = workers;
