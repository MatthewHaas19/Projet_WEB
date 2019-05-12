const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
  'compose',
  {
    idOrder: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    idService: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  },
  {
    timestamps: false
  }
)

