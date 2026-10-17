const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connection');

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
    allowNull: false,
    validate: {
      len: { args: [8, 100], msg: "Contraseña: 8-100 caracteres." }
    }
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
  }
}, {
  timestamps: true,
  tableName: 'usuarios'
});

module.exports = Usuario;