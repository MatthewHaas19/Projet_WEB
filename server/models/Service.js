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
    idType: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
)

