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


orders.put('/setFinished',(req,res) => {
  Order.update({
      orderStatus: 'Finished',
    },
    {
      where: {
        idOrder: req.body.idOrder
      }
    }).then(order => {
    console.log(order)
    res.json(order)
  }).catch(err => {
    console.log(err)
  })
});

orders.get('/OrderPending/:id',(req,res) => {
  Order.findAll({
    where: {
      idUser: req.params.id,
      orderStatus: ['pending', 'On his way']
    }
  }).then(order => {
    if (!order) {
      res.send({})
    } else {
      res.send(order)
    }
  })
})


orders.get('/OrderAllPending',(req,res) => {
  Order.findAll({
    where: {
      orderStatus: 'pending'
    }
  }).then(order => {
    if (!order) {
      res.send({})
    } else {
      res.send(order)
    }
  })
})

orders.get('/getWorkerOrders/:id',(req,res) => {
  Order.findAll({
    where: {
      idWorker: req.params.id,
      orderStatus: 'On his way'
    }
  }).then(order => {
    if (!order) {
      res.send({})
    } else {
      res.send(order)
    }
  })
})


orders.put('/PickAnOrder/:id',(req,res) => {
  Order.findOne({
    where: {
      idOrder: req.body.idOrder
    }
  }).then(order => {
    if (!order) {
      res.send('error : there is no order with that id')
    } else {
      Order.update({
        orderStatus: 'On his way',
        idWorker: req.params.id
      },
        {
          where: {
           idOrder: req.body.idOrder
          }
        }).then(order => {
          console.log(order)
          res.json(order)
      })
    }
  })
})


orders.get('/getServiceByOrder/:id',(req,res) => {
  Compose.findOne({
    where: {
      idOrder: req.params.id
    }
  }).then(compose => {
    if (!compose) {
      res.send({})
    } else {
      Service.findOne({
        where: {
          idServices: compose.idService
        }
      }).then(service => {
        res.send(service)
      })
    }
  })
})


module.exports = orders;
