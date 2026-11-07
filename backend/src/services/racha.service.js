const fechaAnterior = (fecha) => {
  const [year, month, day] = fecha.split('-').map(Number);
  const resultado = new Date(Date.UTC(year, month - 1, day - 1));
  return resultado.toISOString().slice(0, 10);
};

const obtenerFechaActual = () => new Date().toISOString().slice(0, 10);

const procesarRachas = async ({
  sequelize,
  Usuario,
  Entrenamiento,
  fechaEvaluacion = obtenerFechaActual()
}) => {
  const fechaEntrenamiento = fechaAnterior(fechaEvaluacion);
  let usuariosProcesados = 0;

  await sequelize.transaction(async (transaction) => {
    const usuarios = await Usuario.findAll({
      where: { activo: true },
      attributes: ['id', 'rachaActual', 'escudosProtectores', 'ultimaEvaluacionRacha'],
      include: [{
        model: Entrenamiento,
        as: 'entrenamientos',
        attributes: ['id'],
        where: {
          fecha: fechaEntrenamiento,
          completado: true
        },
        required: false
      }],
      transaction,
      lock: transaction.LOCK.UPDATE
    });

    const actualizaciones = [];

    for (const usuario of usuarios) {
      if (usuario.ultimaEvaluacionRacha === fechaEntrenamiento) {
        continue;
      }

      const entrenoRealizado = (usuario.entrenamientos || []).length > 0;
      let rachaActual = usuario.rachaActual;
      let escudosProtectores = usuario.escudosProtectores;

      if (entrenoRealizado) {
        rachaActual += 1;
      } else if (escudosProtectores > 0) {
        escudosProtectores -= 1;
      } else {
        rachaActual = 0;
      }

      actualizaciones.push({
        id: usuario.id,
        rachaActual,
        escudosProtectores,
        ultimaEvaluacionRacha: fechaEntrenamiento
      });
    }

    if (actualizaciones.length > 0) {
      await Usuario.bulkCreate(actualizaciones, {
        transaction,
        updateOnDuplicate: [
          'rachaActual',
          'escudosProtectores',
          'ultimaEvaluacionRacha',
          'updatedAt'
        ]
      });
      usuariosProcesados = actualizaciones.length;
    }
  });

  return { fechaEvaluada: fechaEntrenamiento, usuariosProcesados };
};

module.exports = { procesarRachas };
