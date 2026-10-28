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
      transaction,
      lock: transaction.LOCK.UPDATE
    });

    for (const usuario of usuarios) {
      if (usuario.ultimaEvaluacionRacha === fechaEntrenamiento) {
        continue;
      }

      const entrenamiento = await Entrenamiento.findOne({
        where: {
          usuarioId: usuario.id,
          fecha: fechaEntrenamiento,
          completado: true
        },
        transaction
      });

      if (entrenamiento) {
        usuario.rachaActual += 1;
      } else if (usuario.escudosProtectores > 0) {
        usuario.escudosProtectores -= 1;
      } else {
        usuario.rachaActual = 0;
      }

      usuario.ultimaEvaluacionRacha = fechaEntrenamiento;
      await usuario.save({ transaction });
      usuariosProcesados += 1;
    }
  });

  return { fechaEvaluada: fechaEntrenamiento, usuariosProcesados };
};

module.exports = { procesarRachas };
