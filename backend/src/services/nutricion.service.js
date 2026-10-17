const { ObjetivoNutricional } = require('../models');

class NutricionService {
  async obtenerObjetivoPorUsuario(usuarioId) {
    const objetivo = await ObjetivoNutricional.findOne({ where: { usuarioId } });
    if (!objetivo) {
      throw new Error('NOT_FOUND');
    }
    return objetivo;
  }

  async guardarObjetivo(usuarioId, datosNutricionales) {
    const payloadSeguro = {
      caloriasDiarias: datosNutricionales.caloriasDiarias,
      gramosProteina: datosNutricionales.gramosProteina,
      gramosCarbohidratos: datosNutricionales.gramosCarbohidratos,
      gramosGrasas: datosNutricionales.gramosGrasas
    };

    const [objetivo, created] = await ObjetivoNutricional.upsert({
      usuarioId,
      ...payloadSeguro
    }, { returning: true });

    return { objetivo, created };
  }
}

module.exports = new NutricionService();