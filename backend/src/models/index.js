const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const db = {};

const escanearModelos = (directorio) => {
  fs.readdirSync(directorio).forEach(archivo => {
    const rutaCompleta = path.join(directorio, archivo);
    if (fs.statSync(rutaCompleta).isDirectory()) {
      escanearModelos(rutaCompleta);
    } else if (archivo.endsWith('.js') && archivo !== 'index.js') {
      const model = require(rutaCompleta)(sequelize, DataTypes);
      db[model.name] = model;
    }
  });
};

escanearModelos(__dirname);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;