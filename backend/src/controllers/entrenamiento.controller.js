const { Entrenamiento } = require('../models');
const { calcularYRegistrarFatiga } = require('../services/fatiga.service');

const registrarEntrenamiento = async (req, res) => {
  try {
    const { fechaLocal: fecha, ejerciciosCompletados } = req.body;
    const fechaRegistro = fecha || new Date().toISOString().slice(0, 10);
    const [entrenamiento, creado] = await Entrenamiento.findOrCreate({
      where: {
        usuarioId: req.user.id,
        fecha: fechaRegistro
      },
      defaults: {
        completado: true
      }
    });

    let estadoMuscular = 'Sin cambios';
    if (creado && ejerciciosCompletados && ejerciciosCompletados.length > 0) {
      await calcularYRegistrarFatiga(req.user.id, ejerciciosCompletados);
      estadoMuscular = 'Actualizado';
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
    if (error.message && (error.message.includes('No existe') || error.message.includes('grupo muscular'))) {
      return res.status(400).json({ ok: false, error: error.message });
    }

    return res.status(500).json({
      ok: false,
      error: 'Error interno al registrar el entrenamiento.'
    });
  }
};

module.exports = { registrarEntrenamiento };
