const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

if (!process.env.JWT_SECRET) {
  throw new Error('La variable de entorno JWT_SECRET es obligatoria');
}

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false
  },
  JWT_SECRET: process.env.JWT_SECRET
};