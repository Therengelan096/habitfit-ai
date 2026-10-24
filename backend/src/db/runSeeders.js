const { sequelize } = require("../models");
const ejecutarSeederEjercicios = require("./seeders/ejercicios.seed");

const runSeeders = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida para inyeccion de seeders.");

    await ejecutarSeederEjercicios();

    console.log("Procesode seeders completado");
    process.exit(0);
  } catch (error) {
    console.error("Error al ejecutar los seeders:", error);
    process.exit(1);
  }
};
runSeeders();
