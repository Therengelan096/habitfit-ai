const { GrupoMuscular, Ejercicio } = require('../../models');

const ejecutarSeederEjercicios = async () => {
  try {
    const count = await Ejercicio.count();
    if (count > 0) {
      console.log('El catálogo de ejercicios ya contiene registros.');
      return;
    }

    const pecho = await GrupoMuscular.create({ nombre: 'Pectoral', descripcion: 'Músculos del pecho y empuje horizontal.' });
    const espalda = await GrupoMuscular.create({ nombre: 'Espalda', descripcion: 'Dorsales y romboides orientados a tracción.' });
    const piernas = await GrupoMuscular.create({ nombre: 'Cuádriceps y Glúteos', descripcion: 'Tren inferior y extensión de rodilla/cadera.' });
    const hombros = await GrupoMuscular.create({ nombre: 'Hombros', descripcion: 'Deltoides anterior, lateral y posterior.' });
    const brazos = await GrupoMuscular.create({ nombre: 'Brazos', descripcion: 'Bíceps y tríceps braquial.' });
    const abdomen = await GrupoMuscular.create({ nombre: 'Abdomen / Core', descripcion: 'Recto abdominal y oblicuos orientados a estabilidad.' });

    const ejerciciosBase = [
      // Pecho
      { nombre: 'Press de Banca Plano con Barra', grupoMuscularId: pecho.id, nivelDificultad: 'Intermedio', tipoMovimiento: 'Empuje', requiereEquipo: true, equipamientoNecesario: 'Barra y Banco', referenciaBibliografica: 'American Council on Exercise (ACE) - Chest Activation Study', nivelEfectividad: 'Óptimo' },
      { nombre: 'Flexiones de Pecho (Push-ups)', grupoMuscularId: pecho.id, nivelDificultad: 'Principiante', tipoMovimiento: 'Empuje', requiereEquipo: false, equipamientoNecesario: 'Ninguno', referenciaBibliografica: 'Biomechanics of Calisthenics & Bodyweight Training', nivelEfectividad: 'Alto' },
      { nombre: 'Press Inclinado con Mancuernas', grupoMuscularId: pecho.id, nivelDificultad: 'Intermedio', tipoMovimiento: 'Empuje', requiereEquipo: true, equipamientoNecesario: 'Mancuernas', referenciaBibliografica: 'Journal of Strength and Conditioning Research (JSCR)', nivelEfectividad: 'Óptimo' },
      { nombre: 'Fondos en Paralelas (Dips)', grupoMuscularId: pecho.id, nivelDificultad: 'Avanzado', tipoMovimiento: 'Empuje', requiereEquipo: true, equipamientoNecesario: 'Paralelas', referenciaBibliografica: 'ACE Electromyography (EMG) Research', nivelEfectividad: 'Óptimo' },

      // Espalda
      { nombre: 'Dominadas Pronas (Pull-ups)', grupoMuscularId: espalda.id, nivelDificultad: 'Avanzado', tipoMovimiento: 'Tracción', requiereEquipo: true, equipamientoNecesario: 'Barra de Dominadas', referenciaBibliografica: 'Sperandei et al. (2009) - Latissimus Dorsi EMG Analysis', nivelEfectividad: 'Óptimo' },
      { nombre: 'Remo con Barra', grupoMuscularId: espalda.id, nivelDificultad: 'Intermedio', tipoMovimiento: 'Tracción', requiereEquipo: true, equipamientoNecesario: 'Barra', referenciaBibliografica: 'Escamilla et al. - Back Mechanics Research', nivelEfectividad: 'Óptimo' },
      { nombre: 'Remo Unilateral con Mancuerna', grupoMuscularId: espalda.id, nivelDificultad: 'Principiante', tipoMovimiento: 'Tracción', requiereEquipo: true, equipamientoNecesario: 'Mancuerna', referenciaBibliografica: 'Journal of Sports Sciences', nivelEfectividad: 'Alto' },
      { nombre: 'Remo Australiano (Body Row)', grupoMuscularId: espalda.id, nivelDificultad: 'Principiante', tipoMovimiento: 'Tracción', requiereEquipo: false, equipamientoNecesario: 'Barra baja / TRX', referenciaBibliografica: 'Darebee Bodyweight Science Guidelines', nivelEfectividad: 'Alto' },

      // Piernas
      { nombre: 'Sentadilla Libre con Barra (Back Squat)', grupoMuscularId: piernas.id, nivelDificultad: 'Avanzado', tipoMovimiento: 'Dominante de Rodilla', requiereEquipo: true, equipamientoNecesario: 'Barra y Rack', referenciaBibliografica: 'Schoenfeld et al. - Muscle Hypertrophy Guidelines', nivelEfectividad: 'Óptimo' },
      { nombre: 'Sentadilla Búlgara', grupoMuscularId: piernas.id, nivelDificultad: 'Intermedio', tipoMovimiento: 'Unilateral', requiereEquipo: true, equipamientoNecesario: 'Banco y Mancuernas', referenciaBibliografica: 'Journal of Applied Biomechanics', nivelEfectividad: 'Óptimo' },
      { nombre: 'Peso Muerto Rumano (RDL)', grupoMuscularId: piernas.id, nivelDificultad: 'Intermedio', tipoMovimiento: 'Dominante de Cadera', requiereEquipo: true, equipamientoNecesario: 'Barra o Mancuernas', referenciaBibliografica: 'Contreras et al. - Gluteus & Hamstring Activation', nivelEfectividad: 'Óptimo' },
      { nombre: 'Hip Thrust', grupoMuscularId: piernas.id, nivelDificultad: 'Intermedio', tipoMovimiento: 'Dominante de Cadera', requiereEquipo: true, equipamientoNecesario: 'Barra y Banco', referenciaBibliografica: 'Contreras Strength & Conditioning Journal', nivelEfectividad: 'Óptimo' },
      { nombre: 'Zancadas (Lunges)', grupoMuscularId: piernas.id, nivelDificultad: 'Principiante', tipoMovimiento: 'Unilateral', requiereEquipo: false, equipamientoNecesario: 'Ninguno (Opcional mancuernas)', referenciaBibliografica: 'ACE Balance & Strength Studies', nivelEfectividad: 'Alto' },

      // Hombros
      { nombre: 'Press Militar con Barra', grupoMuscularId: hombros.id, nivelDificultad: 'Intermedio', tipoMovimiento: 'Empuje Vertical', requiereEquipo: true, equipamientoNecesario: 'Barra', referenciaBibliografica: 'Saeterbakken & Fimland (2013) - Shoulder Stability', nivelEfectividad: 'Óptimo' },
      { nombre: 'Elevaciones Laterales con Mancuernas', grupoMuscularId: hombros.id, nivelDificultad: 'Principiante', tipoMovimiento: 'Aislamiento', requiereEquipo: true, equipamientoNecesario: 'Mancuernas', referenciaBibliografica: 'ACE Study on Deltoid Muscle Recruitment', nivelEfectividad: 'Óptimo' },
      { nombre: 'Face Pull en Polea', grupoMuscularId: hombros.id, nivelDificultad: 'Principiante', tipoMovimiento: 'Tracción Posterior', requiereEquipo: true, equipamientoNecesario: 'Polea con Cuerda', referenciaBibliografica: 'Physical Therapy in Sport - Rotator Cuff Health', nivelEfectividad: 'Alto' },

      // Brazos
      { nombre: 'Curl de Bíceps con Barra Z', grupoMuscularId: brazos.id, nivelDificultad: 'Principiante', tipoMovimiento: 'Flexión de Codo', requiereEquipo: true, equipamientoNecesario: 'Barra Z', referenciaBibliografica: 'Oliveira et al. (2009) - Biceps Brachii EMG', nivelEfectividad: 'Alto' },
      { nombre: 'Curl Martillo con Mancuernas', grupoMuscularId: brazos.id, nivelDificultad: 'Principiante', tipoMovimiento: 'Flexión de Codo', requiereEquipo: true, equipamientoNecesario: 'Mancuernas', referenciaBibliografica: 'Journal of Strength and Conditioning Research', nivelEfectividad: 'Alto' },
      { nombre: 'Press Francés para Tríceps', grupoMuscularId: brazos.id, nivelDificultad: 'Intermedio', tipoMovimiento: 'Extensión de Codo', requiereEquipo: true, equipamientoNecesario: 'Barra y Banco', referenciaBibliografica: 'ACE Triceps Brachii Activation Study', nivelEfectividad: 'Óptimo' },
      { nombre: 'Extensiones de Tríceps en Polea', grupoMuscularId: brazos.id, nivelDificultad: 'Principiante', tipoMovimiento: 'Extensión de Codo', requiereEquipo: true, equipamientoNecesario: 'Polea', referenciaBibliografica: 'Biomechanics of Elbow Extension Exercises', nivelEfectividad: 'Alto' },

      // Abdomen
      { nombre: 'Plancha Abdominal (Plank)', grupoMuscularId: abdomen.id, nivelDificultad: 'Principiante', tipoMovimiento: 'Isométrico', requiereEquipo: false, equipamientoNecesario: 'Ninguno', referenciaBibliografica: 'McGill Core Stability & Spine Biomechanics', nivelEfectividad: 'Óptimo' },
      { nombre: 'Elevación de Piernas colgado de Barra', grupoMuscularId: abdomen.id, nivelDificultad: 'Avanzado', tipoMovimiento: 'Flexión de Cadera/Tronco', requiereEquipo: true, equipamientoNecesario: 'Barra de Dominadas', referenciaBibliografica: 'Men’s Health Science Core Study', nivelEfectividad: 'Óptimo' },
      { nombre: 'Russian Twists', grupoMuscularId: abdomen.id, nivelDificultad: 'Intermedio', tipoMovimiento: 'Rotación', requiereEquipo: false, equipamientoNecesario: 'Ninguno (Opcional peso)', referenciaBibliografica: 'ACE Obliques Activation Research', nivelEfectividad: 'Alto' },
      { nombre: 'Dead Bug (Bicho Muerto)', grupoMuscularId: abdomen.id, nivelDificultad: 'Principiante', tipoMovimiento: 'Estabilidad Anti-movimiento', requiereEquipo: false, equipamientoNecesario: 'Ninguno', referenciaBibliografica: 'Clinical Biomechanics of Lumbar Stabilization', nivelEfectividad: 'Alto' }
    ];

    await Ejercicio.bulkCreate(ejerciciosBase);
    console.log('Seeder ejecutado: 24 ejercicios científicos insertados exitosamente.');
  } catch (error) {
    console.error('Error al ejecutar el seeder de ejercicios:', error);
  }
};

module.exports = ejecutarSeederEjercicios;