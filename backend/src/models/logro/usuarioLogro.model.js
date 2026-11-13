module.exports = (sequelize, DataTypes) => {
  const UserAchievement = sequelize.define('UserAchievement', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    usuarioId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    logroId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    otorgadoEn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true,
    tableName: 'usuarios_logros',
    indexes: [{ unique: true, fields: ['usuarioId', 'logroId'] }]
  });

  UserAchievement.associate = (models) => {
    UserAchievement.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
    UserAchievement.belongsTo(models.Achievement, { foreignKey: 'logroId', as: 'logro' });
  };

  return UserAchievement;
};
