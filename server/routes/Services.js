const express = require("express");
const services = express.Router();
const cors = require("cors");


const TypeService = require("../models/TypeService");
const Service = require("../models/Service");
services.use(cors());


services.get('/typeServices',(req,res) => {
  TypeService.findAll().then(services => {
    res.json(services);
    console.log(services)
  })
});

services.post('/addService',(req,res) => {
  const serviceData = {
    name : req.body.name,
    desc: req.body.desc,
    idType: req.body.type,
  };

  console.log(serviceData)

  Service.findOne({
    where: {
      name: req.body.name
    }
  }).then(service => {
    if(!service){
      Service.create(serviceData).then(service => {
        res.json(service)
        console.log("result : ",service)
      }).catch(err => {
        res.send('error: ' + err)
      })
    }else{
      res.json({error: 'Service already exists'})
    }
  }).catch(err => {
    res.send('error: ' + err)
  })
});

module.exports = services;
