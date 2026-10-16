const Sequelize = require("sequelize");
const sequelize = require("../db/connection");
const { Usuario, PerfilCorporal } = require("./usuario");

const db = {
  Sequelize,
  sequelize,
  Usuario,
  PerfilCorporal
};

module.exports = db;