const { Ejercicio, GrupoMuscular, FatigaMuscular, sequelize } = require('../models');
const config = require('../config/entrenamiento.config');

const calcularYRegistrarFatiga = async (usuarioId, ejerciciosCompletados) => {
  const t = await sequelize.transaction();

  try {
    const fatigaAcumulada = {};
    const { factorBase, multiplicadoresDificultad } = config.fatiga;

    const idsEjercicios = ejerciciosCompletados.map(e => e.ejercicioId);

    const ejerciciosDb = await Ejercicio.findAll({
      where: { id: idsEjercicios },
      include: [{ model: GrupoMuscular, as: 'grupoMuscular' }],
      transaction: t
    });

    const mapaEjercicios = new Map(ejerciciosDb.map(e => [e.id, e]));

    for (const item of ejerciciosCompletados) {
      const ejercicio = mapaEjercicios.get(item.ejercicioId);

      if (!ejercicio) {
        throw new Error(`El ejercicio con ID ${item.ejercicioId} no existe en el sistema.`);
      }
      if (!ejercicio.grupoMuscular) {
        throw new Error(`El ejercicio '${ejercicio.nombre}' no tiene un grupo muscular asociado.`);
      }

      const series = Number(item.series);
      const repeticiones = Number(item.repeticiones);

      const nivel = ejercicio.nivelDificultad ? ejercicio.nivelDificultad.toLowerCase() : 'principiante';
      const multiplicador = multiplicadoresDificultad[nivel] || 1.0;

      const fatigaGenerada = series * repeticiones * factorBase * multiplicador;
      const musculoId = ejercicio.grupoMuscularId;
      const padreId = ejercicio.grupoMuscular.padreId;

      fatigaAcumulada[musculoId] = (fatigaAcumulada[musculoId] || 0) + fatigaGenerada;

      if (padreId) {
        fatigaAcumulada[padreId] = (fatigaAcumulada[padreId] || 0) + (fatigaGenerada * 0.5);
      }
    }

    for (const [grupoMuscularId, fatigaSumar] of Object.entries(fatigaAcumulada)) {
      const [registroFatiga] = await FatigaMuscular.findOrCreate({
        where: { usuarioId, grupoMuscularId },
        defaults: { porcentajeFatiga: 0 },
        transaction: t
      });

      let nuevaFatiga = registroFatiga.porcentajeFatiga + fatigaSumar;
      if (nuevaFatiga > 100) nuevaFatiga = 100;

      registroFatiga.porcentajeFatiga = nuevaFatiga;
      registroFatiga.ultimaActualizacion = new Date();

      await registroFatiga.save({ transaction: t });
    }

    await t.commit();
    return { success: true, message: 'Fatiga muscular actualizada con éxito' };

  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = { calcularYRegistrarFatiga };