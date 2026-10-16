const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const db = require('./models');
const routes = require('./routes/index.routes');

class Server {
    constructor() {
        this.app = express();
        this.port = config.PORT_BE || '3000';
        this.apiPaths = {
            index: '/api'
        };

        this.middlewares();
        this.routes();
    }

    // Método de conexión a la base de datos
    async dbConnection() {
        return db.sequelize.authenticate()
            .then(() => {
                console.log('Database connected');
                return db.sequelize.sync({ alter: true });
            })
            .then(() => {
                console.log('Tablas sincronizadas correctamente');
            })
            .catch((error) => {
                console.error('Error initializing database connection:', error);
                throw error;
            });
    }

    async prepare() {
        try {
            await this.dbConnection();
            return this;
        } catch (error) {
            console.error('Error preparing server:', error);
            throw error;
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.apiPaths.index, routes);
    }

    listen() {
        this.prepare()
            .then(() => {
                this.app.listen(this.port, () => {
                    console.log(`Server running on port ${this.port}`);
                });
            })
            .catch((error) => {
                console.error('Error initializing server:', error.message);
                process.exit(1);
            });
    }

    getApp() {
        return this.app;
    }
}

module.exports = Server;