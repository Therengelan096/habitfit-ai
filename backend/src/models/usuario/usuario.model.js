module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre es obligatorio." },
        len: { args: [2, 50], msg: "Nombre: 2-50 caracteres." }
      }
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: { args: [2, 50], msg: "Apellido: 2-50 caracteres." }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Email inválido." }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: { msg: "Fecha inválida." },
        isBefore: {
          args: [new Date().toISOString().split('T')[0]],
          msg: "La fecha no puede ser futura."
        }
      }
    },
    genero: {
      type: DataTypes.ENUM('masculino', 'femenino'),
      allowNull: true
    },
    rachaActual: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    escudosProtectores: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    ultimaEvaluacionRacha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'usuarios'
  });

  Usuario.associate = (models) => {
    Usuario.hasOne(models.PerfilCorporal, { foreignKey: 'usuarioId', as: 'perfil' });
    Usuario.hasOne(models.ObjetivoNutricional, { foreignKey: 'usuarioId', as: 'objetivosNutricionales' });
    Usuario.hasMany(models.Entrenamiento, { foreignKey: 'usuarioId', as: 'entrenamientos' });
  };

  return Usuario;
};