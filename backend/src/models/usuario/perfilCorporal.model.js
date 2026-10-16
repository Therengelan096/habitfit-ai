const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connection');

const PerfilCorporal = sequelize.define('PerfilCorporal', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  peso: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  altura: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tipoSomatico: {
    type: DataTypes.ENUM('ectomorfo', 'mesomorfo', 'endomorfo'),
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'perfiles_corporales'
});

module.exports = PerfilCorporal;