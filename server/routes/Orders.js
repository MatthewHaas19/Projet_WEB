const express = require("express");
const orders = express.Router();
const cors = require("cors");


const Order = require("../models/Order");
const Compose = require("../models/Compose");
const Service = require("../models/Service");
orders.use(cors());


orders.post('/OrderOne',(req,res) => {
  const idUser = {
    idUser: req.body.idUser,
    orderDate: Date.now()
  }

  console.log(idUser)

  Order.create(idUser).then(order => {
    console.log("result : ", order)

    Service.findOne({
      where: {
        name: req.body.name
      }
    }).then(service => {
      const composetoAdd = {
        idOrder: order.idOrder,
        idService: service.idServices
      }
      console.log(composetoAdd)
      Compose.create(composetoAdd).then(compose => {
        res.json(compose)
        console.log("result : ",compose)
      }).catch(err => {
        res.send('error: ' + err)
      })
    }).catch(err => {
      res.send('error: ' + err)
    })
  }).catch(err => {
    res.send('error: ' + err)
  })
});


orders.get('/OrderPending/:id',(req,res) => {
  Order.findAll({
    where: {
      idUser: req.params.id,
      orderStatus: 'pending'
    }
  }).then(order => {
    if (!order) {
      res.send({})
    } else {
      console.log(order)
      res.send(order)
    }
  })
})

module.exports = orders;
