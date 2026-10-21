module.exports = (sequelize, DataTypes) => {
  const GrupoMuscular = sequelize.define("GrupoMuscular",{
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "El nombre del grupo muscular es obligatorio" },
        }
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "grupos_musculares",
      timestamps: true,
    },
  );

  GrupoMuscular.associate = (models) => {
    GrupoMuscular.hasMany(models.Ejercicio, { foreignKey: "grupoMuscularId", as: "ejercicios"});
  };
  return GrupoMuscular;
};
