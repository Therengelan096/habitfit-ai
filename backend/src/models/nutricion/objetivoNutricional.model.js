module.exports = (sequelize, DataTypes) => {
  const ObjetivoNutricional = sequelize.define('ObjetivoNutricional', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    caloriasDiarias: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Las calorías deben ser un número entero válido." },
        min: { args: [1200], msg: "Por salud, las calorías mínimas son 1200." },
        max: { args: [10000], msg: "Límite calórico excedido." }
      }
    },
    gramosProteina: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: { args: [0], msg: "La proteína no puede ser negativa." },
        max: { args: [500], msg: "Límite biológico de proteína excedido (máx 500g)." }
      }
    },
    gramosCarbohidratos: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: { args: [0], msg: "Los carbohidratos no pueden ser negativos." },
        max: { args: [1500], msg: "Límite biológico de carbohidratos excedido (máx 1500g)." }
      }
    },
    gramosGrasas: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: { args: [0], msg: "Las grasas no pueden ser negativas." },
        max: { args: [400], msg: "Límite biológico de grasas excedido (máx 400g)." }
      }
    }
  }, {
    timestamps: true,
    tableName: 'objetivos_nutricionales'
  });

  ObjetivoNutricional.associate = (models) => {
    ObjetivoNutricional.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
  };

  return ObjetivoNutricional;
};