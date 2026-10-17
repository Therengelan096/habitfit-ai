const fs = require('fs');
const path = require('path');
const sequelize = require('./connection');

const runMigrations = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida para migraciones.');

    const migrationsPath = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migrationsPath).sort();

    for (const file of files) {
      if (file.endsWith('.sql')) {
        const filePath = path.join(migrationsPath, file);
        const sql = fs.readFileSync(filePath, 'utf8');

        console.log(`Ejecutando migración: ${file}`);
        await sequelize.query(sql);
        console.log(`Migración completada: ${file}`);
      }
    }

    console.log('Todas las migraciones fueron ejecutadas con éxito.');
    process.exit(0);
  } catch (error) {
    console.error('Error al ejecutar migraciones:', error);
    process.exit(1);
  }
};

runMigrations();