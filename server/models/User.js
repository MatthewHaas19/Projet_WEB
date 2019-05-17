const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.STRING,
      defaultValue: 'false'
    },
    image: {
      type: Sequelize.STRING
    },
  },
  {
    timestamps: false
  }
)

