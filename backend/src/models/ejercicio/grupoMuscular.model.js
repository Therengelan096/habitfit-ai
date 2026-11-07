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
          len: {
            args: [1, 100],
            msg: "El nombre de este no puede superar los 100 caracteres",
          },
        }
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      categoria: {
              type: DataTypes.ENUM('principal', 'avanzado', 'articulacion'),
              defaultValue: 'principal',
              allowNull: false
            },
            padreId: {
              type: DataTypes.UUID,
              allowNull: true
            }
    },
    {
      tableName: "grupos_musculares",
      timestamps: true,
    },
  );

  GrupoMuscular.associate = (models) => {
    GrupoMuscular.hasMany(models.Ejercicio, { foreignKey: "grupoMuscularId", as: "ejercicios"});
    GrupoMuscular.hasMany(models.FatigaMuscular, { foreignKey: "grupoMuscularId", as: "fatigasAsociadas" });
        GrupoMuscular.belongsTo(models.GrupoMuscular, { foreignKey: "padreId", as: "musculoPadre" });
        GrupoMuscular.hasMany(models.GrupoMuscular, { foreignKey: "padreId", as: "subMusculos" });
  };
  return GrupoMuscular;
};
