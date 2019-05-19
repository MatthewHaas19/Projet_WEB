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

  Service.findOne({
    where: { name: req.body.name }
  }).then(service => {
    Order.findAll({
      where: { orderStatus: 'pending', idUser: idUser.idUser}
    }).then(oldOrders => {
      console.log(oldOrders)
      if(oldOrders.length){
        console.log('test')
        for(let i=0;i<oldOrders.length;i++){
          Compose.findOne({
            where: { idOrder: oldOrders[i].idOrder, idService: service.idServices }
          }).then(compose => {
            console.log(compose)
            if(compose){
              res.json({error: 'You can\'t pick multiple services'})
              return ;
            }
            else{
              Order.create(idUser).then(order => {
                Compose.create({idOrder: order.idOrder, idService: service.idServices}).then(compose => {
                  res.json(compose);
                })
              })
            }
          })
        }
      }
      else{
        console.log('order added')
        Order.create(idUser).then(order => {
          Compose.create({idOrder: order.idOrder, idService: service.idServices}).then(compose => {
            res.json(compose);
          })
        })
      }
    })
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
      Order.findOne({
        where: {
          orderStatus: 'On his way',
          idWorker: req.params.id
        }
      }).then(oldOrder => {
        if(oldOrder){
          if(oldOrder.idUser != order.idUser){
            res.json({error: 'You can\' pick multiple order'})
            return ;
          }
        }
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

orders.delete('/orderDelete/:id',(req,res) => {
  Order.findOne({
    where: {
      idOrder: req.params.id
    }
  }).then(order => {
    Order.destroy({
      where: {
        idOrder: req.params.id
      }
    }).then(order2 => {
      Compose.destroy({
        where: {
          idOrder: order.idOrder
        }
      }).then(compose => {
        console.log(compose)
        res.json(compose)
      })
    })
  })
});


module.exports = orders;
