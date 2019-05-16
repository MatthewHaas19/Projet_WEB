const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
  'service',
  {
    idServices: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    desc: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    },
    idType: {
      type: Sequelize.INTEGER
    },
    image: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)

