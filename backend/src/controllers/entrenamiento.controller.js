const { Entrenamiento } = require('../models');
const { calcularYRegistrarFatiga } = require('../services/fatiga.service');
const obtenerFechaActual = () => new Date().toISOString().slice(0, 10);

const registrarEntrenamiento = async (req, res) => {
  try {
    const fecha = obtenerFechaActual();
    const [entrenamiento, creado] = await Entrenamiento.findOrCreate({
      where: {
        usuarioId: req.user.id,
        fecha
      },
      defaults: {
        completado: true
      }
    });

    const { ejerciciosCompletados } = req.body;
    let estadoMuscular = 'Sin cambios';

    if (Array.isArray(ejerciciosCompletados) && ejerciciosCompletados.length > 0) {
      const ejerciciosValidos = ejerciciosCompletados.filter(
        (ej) => ej.ejercicioId && typeof ej.series === 'number' && typeof ej.repeticiones === 'number'
      );

      if (ejerciciosValidos.length > 0) {
        await calcularYRegistrarFatiga(req.user.id, ejerciciosValidos);
        estadoMuscular = 'Actualizado';
      }
    }

    return res.status(creado ? 201 : 200).json({
      ok: true,
      message: creado
        ? 'Entrenamiento registrado para hoy.'
        : 'El entrenamiento de hoy ya estaba registrado.',
      data: {
        entrenamiento,
        estadoMuscular
      }
    });
  } catch (error) {
    console.error('Error al registrar entrenamiento:', error);
    return res.status(500).json({
      ok: false,
      error: 'Error interno al registrar el entrenamiento.'
    });
  }
};

module.exports = { registrarEntrenamiento };
