const { Achievement, UserAchievement } = require('../models');

const listarLogros = async (req, res) => {
  try {
    const [logros, logrosUsuario] = await Promise.all([
      Achievement.findAll({ order: [['diasRacha', 'ASC']] }),
      UserAchievement.findAll({
        where: { usuarioId: req.user.id },
        attributes: ['logroId', 'otorgadoEn']
      })
    ]);

    const otorgados = new Map(
      logrosUsuario.map((logro) => [logro.logroId, logro.otorgadoEn])
    );

    return res.status(200).json({
      ok: true,
      data: logros.map((logro) => ({
        id: logro.id,
        codigo: logro.codigo,
        nombre: logro.nombre,
        descripcion: logro.descripcion,
        diasRacha: logro.diasRacha,
        earned: otorgados.has(logro.id),
        earnedAt: otorgados.get(logro.id) || null,
        details: {
          thresholdDays: logro.diasRacha,
          earnedAt: otorgados.get(logro.id) || null
        }
      }))
    });
  } catch (error) {
    console.error('Error al listar logros:', error);
    return res.status(500).json({
      ok: false,
      error: 'Error interno al obtener los logros.'
    });
  }
};

module.exports = { listarLogros };
