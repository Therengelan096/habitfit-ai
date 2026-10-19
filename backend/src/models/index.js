const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const Usuario = require("./usuario/usuario.model");
const PerfilCorporal = require("./usuario/perfilCorporal.model");

Usuario.hasOne(PerfilCorporal, { foreignKey: 'usuarioId', as: 'perfil' });
PerfilCorporal.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = {
  Sequelize,
  sequelize,
  Usuario,
  PerfilCorporal
};