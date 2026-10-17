const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const Usuario = require("./usuario/usuario.model");
const PerfilCorporal = require("./usuario/perfilCorporal.model");
const ObjetivoNutricional = require("./nutricion/objetivoNutricional.model");

// Relaciones 1 a 1
Usuario.hasOne(PerfilCorporal, { foreignKey: 'usuarioId', as: 'perfil' });
PerfilCorporal.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

Usuario.hasOne(ObjetivoNutricional, { foreignKey: 'usuarioId', as: 'objetivosNutricionales' });
ObjetivoNutricional.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = {
  Sequelize,
  sequelize,
  Usuario,
  PerfilCorporal,
  ObjetivoNutricional
};