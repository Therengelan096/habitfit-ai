const Usuario = require('./usuario.model');
const PerfilCorporal = require('./perfilCorporal.model');

Usuario.hasOne(PerfilCorporal, { foreignKey: 'usuarioId', as: 'perfil' });
PerfilCorporal.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = {
  Usuario,
  PerfilCorporal
};