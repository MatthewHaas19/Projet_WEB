const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
  'typeservice',
  {
    idType: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    libelle: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)

