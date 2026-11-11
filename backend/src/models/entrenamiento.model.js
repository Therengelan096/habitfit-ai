module.exports = (sequelize, DataTypes) => {
  const Entrenamiento = sequelize.define('Entrenamiento', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    usuarioId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notFuture(value) {
          const hoy = new Date().toISOString().slice(0, 10);
          if (value > hoy) {
            throw new Error('La fecha no puede ser futura.');
          }
        }
      }
    },
    completado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: true,
    tableName: 'entrenamientos',
    indexes: [
      {
        unique: true,
        fields: ['usuarioId', 'fecha']
      }
    ]
  });

  Entrenamiento.associate = (models) => {
    Entrenamiento.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
  };

  return Entrenamiento;
};
