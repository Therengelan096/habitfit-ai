module.exports = (sequelize, DataTypes) => {
  const PerfilCorporal = sequelize.define('PerfilCorporal', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: { args: [40], msg: "Peso mínimo: 40 kg." },
        max: { args: [250], msg: "Peso máximo: 250 kg." }
      }
    },
    altura: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: { args: [1.40], msg: "Altura mínima: 1.40 m." },
        max: { args: [2.50], msg: "Altura máxima: 2.50 m." }
      }
    },
    tipoSomatico: {
      type: DataTypes.ENUM('ectomorfo', 'mesomorfo', 'endomorfo'),
      allowNull: false
    }
  }, {
    timestamps: true,
    tableName: 'perfiles_corporales'
  });

  PerfilCorporal.associate = (models) => {
    PerfilCorporal.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
  };

  return PerfilCorporal;
};