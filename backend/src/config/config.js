const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

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
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-key-habitfit'
};