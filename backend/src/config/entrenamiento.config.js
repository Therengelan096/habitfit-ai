const configEntrenamiento = {
  fatiga: {
    factorBase: parseFloat(process.env.FACTOR_BASE_FATIGA),

    multiplicadoresDificultad: {
      principiante: 1.0,
      intermedio: 1.2,
      avanzado: 1.5
    }
  }
};

module.exports = configEntrenamiento;