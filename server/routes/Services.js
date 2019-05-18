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

services.get('/getServices',(req,res) => {
  Service.findAll().then(services => {
    res.json(services);
  })
});

services.get('/getService/:id',(req,res) => {
  Service.findOne({
      where: {
        name: req.params.id
      }
  }).then(services => {
    console.log('service:',services)
    TypeService.findOne({
      where: {
        idType: services.idType
      }
    }).then(type => {
      const aService = {
        idService: services.idServices,
        name: services.name,
        idType: services.idType,
        desc: services.desc,
        price: services.price,
        image: services.image,
        libelle: ''
      }
      aService.libelle = type.libelle
      console.log(aService)
      res.json(aService);
    })
  })
});



services.get('/LibelleOfServices/:id',(req,res) => {
  console.log(req.params.id)
  TypeService.findOne({
    where: {
      idType: req.params.id
    }
  }).then(service => {
    if (!service) {
      res.send('error of type service')
    } else {
      console.log(service)
      res.json(service)
    }
  })
});


services.post('/addService',(req,res) => {
  const serviceData = {
    name : req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    idType: req.body.type,
    image: req.body.image,
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


services.delete('/deleteServices/:name',(req,res) => {
  Service.destroy({
    where: {
      name: req.params.name
    }
  }).then(service => {
    console.log(service)
    res.json(service)
  })
});



services.put('/modifyService/:id',(req,res) => {
  Service.update({
      name : req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      idType: req.body.type,
      image: req.body.image,
    },
    {
      where: {
        idServices: req.params.id
      }
    }).then(service => {
      res.json(service)
    console.log("result : ",service)
    }).catch(err => {
      res.send('error: ' + err)
    })
});



module.exports = services;
