const { Usuario, ObjetivoNutricional } = require('../models');

const inicializarDatosPrueba = async () => {
  try {
    const cantidadUsuarios = await Usuario.count();

    if (cantidadUsuarios === 0) {
      const usuarioPrueba = await Usuario.create({
        nombre: 'Administrador',
        apellido: 'Sistema',
        email: 'admin@habitfit.ai',
        password: 'passwordSeguro123',
        fechaNacimiento: '1995-05-15',
        genero: 'masculino'
      });

      await ObjetivoNutricional.create({
        usuarioId: usuarioPrueba.id,
        caloriasDiarias: 2500,
        gramosProteina: 150,
        gramosCarbohidratos: 300,
        gramosGrasas: 75
      });

      console.log('Usuario de prueba y objetivos nutricionales creados.');
      console.log(`ID PARA PROBAR POSTMAN/UNITARIAS: ${usuarioPrueba.id}`);
      console.log('-----');
    }
  } catch (error) {
    console.error('Error inyectando datos:', error);
  }
};

inicializarDatosPrueba();

module.exports = inicializarDatosPrueba;