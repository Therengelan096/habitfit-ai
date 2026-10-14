const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
