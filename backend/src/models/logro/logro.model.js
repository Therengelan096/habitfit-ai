module.exports = (sequelize, DataTypes) => {
  const Achievement = sequelize.define('Achievement', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    diasRacha: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 }
    }
  }, {
    timestamps: true,
    tableName: 'logros'
  });

  Achievement.associate = (models) => {
    Achievement.hasMany(models.UserAchievement, { foreignKey: 'logroId', as: 'usuariosLogros' });
  };

  return Achievement;
};
