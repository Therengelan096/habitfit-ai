const cron = require('node-cron');
const db = require('../models');
const { procesarRachas } = require('../services/racha.service');

const iniciarJobDeRachas = () => {
  const tarea = cron.schedule('0 0 * * *', async () => {
    try {
      const resultado = await procesarRachas({
        sequelize: db.sequelize,
        Usuario: db.Usuario,
        Entrenamiento: db.Entrenamiento
      });
      console.log(
        `Job de rachas completado: ${resultado.usuariosProcesados} usuarios procesados`
      );
    } catch (error) {
      console.error('Error al ejecutar el job de rachas:', error);
    }
  });

  console.log('Job de rachas programado para medianoche.');
  return tarea;
};

module.exports = { iniciarJobDeRachas };
