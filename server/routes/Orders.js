const express = require("express");
const orders = express.Router();
const cors = require("cors");


const Order = require("../models/Order");
const Compose = require("../models/Compose");
const Service = require("../models/Service");
orders.use(cors());

Order.hasMany(Compose,{foreignKey: 'idOrder'})
Compose.belongsTo(Order, {foreignKey: 'idOrder'})

orders.post('/OrderOne',(req,res) => {
  const idUser = {
    idUser: req.body.idUser,
    orderDate: Date.now()
  };

  Service.findOne({
    where: { name: req.body.name }
  }).then(service => {
    const idService = service.idServices;
    Compose.findOne({
      include: [{
        model: Order,
        where: { orderStatus: ['pending','On his way'], idUser: idUser.idUser}
      }],
      where: {idService: idService}
    }).then(compose => {
      if (compose) {
        res.json({error: 'You already order this service'})
      } else {
        Order.create(idUser).then(order => {
          Compose.create({idOrder: order.idOrder, idService: service.idServices}).then(compose => {
            res.json(compose);
          }).catch(err => {
            res.json({error: 'Problem of creation'})
          })
        })
      }
    })
  })
});

/*
orders.post('/OrderOne',(req,res) => {
  const idUser = {
    idUser: req.body.idUser,
    orderDate: Date.now()
  };

  Service.findOne({
    where: { name: req.body.name }
  }).then(service => {
    Order.findAll({
      where: { orderStatus: 'pending', idUser: idUser.idUser}
    }).then(oldOrders => {
      console.log('Old orders:',oldOrders)
      if(!oldOrders.length) {
        console.log('------Create2----------')
        Order.create(idUser).then(order => {
          Compose.create({idOrder: order.idOrder, idService: service.idServices}).then(compose => {
            res.json(compose);
            return 0;
          }).catch(err => {
            res.json({error: 'User already exists'})
          })
        }).catch(err => {
          res.json({error: 'User already exists'})
        })
      }
      else{
        console.log('test')
        for(let i=0;i<oldOrders.length;i++){
          console.log(oldOrders.idOrder)
          Compose.findOne({
            where: {
              idOrder: oldOrders[i].idOrder,
              idService: service.idServices
            }
          }).then(compose => {
            console.log(compose)
            if(compose){
              console.log('cant pick service')
              res.json({error: 'You can\'t pick multiple services'})
              return 0;
            }
            else{
              if(!compose){
                console.log('------Create1----------')
                Order.create(idUser).then(order => {
                  Compose.create({idOrder: order.idOrder, idService: service.idServices}).then(compose => {
                    res.json(compose);
                    return 0;
                  }).catch(err => {
                    res.json({error: 'User already exists'})
                  })
                }).catch(err => {
                  res.json({error: 'User already exists'})
                })
              }
            }
          }).catch(err => {
            res.json({error: 'User already exists'})
          })
        }
      }
    }).catch(err => {
      res.json({error: 'User already exists'})
    })
  }).catch(err => {
    res.json({error: 'User already exists'})
  })
});



*/


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
    Compose.destroy({
      where: {
        idOrder: order.idOrder
      }
    }).then(order2 => {
      Order.destroy({
        where: {
          idOrder: req.params.id
        }
      }).then(compose => {
        console.log(compose)
        res.json(compose)
      })
    })
  })
});


module.exports = orders;
