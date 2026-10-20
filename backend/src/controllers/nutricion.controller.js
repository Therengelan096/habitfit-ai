const nutricionService = require('../services/nutricion.service');

const getObjetivos = async (req, res) => {
  try {
    const { usuarioId } = req.query;
    const objetivo = await nutricionService.obtenerObjetivoPorUsuario(usuarioId);
    return res.status(200).json({ ok: true, data: objetivo });
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ ok: false, error: 'Objetivos no encontrados para este usuario.' });
    }
    return res.status(500).json({ ok: false, error: 'Error interno del servidor.' });
  }
};

const updateObjetivos = async (req, res) => {
  try {
    const { usuarioId, ...datosNutricionales } = req.body;

    const { objetivo, created } = await nutricionService.guardarObjetivo(usuarioId, datosNutricionales);

    const statusCode = created ? 201 : 200;
    const message = created ? 'Objetivos creados con éxito.' : 'Objetivos actualizados con éxito.';

    return res.status(statusCode).json({ ok: true, message, data: objetivo });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errores = error.errors.map(err => err.message);
      return res.status(400).json({ ok: false, error: 'Validación fallida', detalles: errores });
    }
    return res.status(500).json({ ok: false, error: 'Error interno al procesar los objetivos.' });
  }
};

module.exports = { getObjetivos, updateObjetivos };