const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
  'order',
  {
    idOrder: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderStatus: {
      type: Sequelize.STRING
    },
    orderDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    idUser: {
      type: Sequelize.INTEGER
    },
    idWorker: {
      type: Sequelize.INTEGER
    },
  },
  {
    timestamps: false
  }
)

