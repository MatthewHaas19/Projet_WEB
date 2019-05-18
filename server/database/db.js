const Sequelize = require("sequelize")
const db = {}
//const sequelize = new Sequelize('mysql://matthewh:myservices@51.254.214.203/myservices')
const sequelize = new Sequelize("myservices","matthewh","myservices", {
  host: "51.254.214.203",
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000
  }
})



db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
