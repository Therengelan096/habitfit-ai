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
      if (!ejercicio || !ejercicio.grupoMuscular) continue;

      const series = Number(item.series) || 0;
      const repeticiones = Number(item.repeticiones) || 0;
      if (series <= 0 || repeticiones <= 0) continue;

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
    throw new Error('Error al calcular fatiga: ' + error.message);
  }
};

module.exports = { calcularYRegistrarFatiga };