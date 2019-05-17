const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
  'review',
  {
    idReview: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idUser: {
      type: Sequelize.INTEGER,
    },
    idWorker: {
      type: Sequelize.INTEGER,
    },
    Content: {
      type: Sequelize.STRING,
    },
    Type: {
      type: Sequelize.STRING,
    }
  },
  {
    timestamps: false
  }
)

