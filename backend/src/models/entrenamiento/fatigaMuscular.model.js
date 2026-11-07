module.exports = (sequelize, DataTypes) => {
  const FatigaMuscular = sequelize.define('FatigaMuscular', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    usuarioId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    grupoMuscularId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    porcentajeFatiga: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: { args: [0], msg: "La fatiga no puede ser menor a 0%" },
        max: { args: [100], msg: "La fatiga máxima es 100%" }
      }
    },
    ultimaActualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true,
    tableName: 'fatiga_muscular',
    indexes: [
      {
        unique: true,
        fields: ['usuarioId', 'grupoMuscularId']
      }
    ]
  });

  FatigaMuscular.associate = (models) => {
    FatigaMuscular.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
    FatigaMuscular.belongsTo(models.GrupoMuscular, { foreignKey: 'grupoMuscularId', as: 'grupoMuscular' });
  };

  return FatigaMuscular;
};