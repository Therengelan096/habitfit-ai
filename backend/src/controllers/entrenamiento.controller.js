const { Entrenamiento } = require('../models');

const registrarEntrenamiento = async (req, res) => {
  try {
    const { fechaLocal: fecha } = req.body;
    const [entrenamiento, creado] = await Entrenamiento.findOrCreate({
      where: {
        usuarioId: req.user.id,
        fecha
      },
      defaults: {
        completado: true
      }
    });

    return res.status(creado ? 201 : 200).json({
      ok: true,
      message: creado
        ? 'Entrenamiento registrado para hoy.'
        : 'El entrenamiento de hoy ya estaba registrado.',
      data: entrenamiento
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
