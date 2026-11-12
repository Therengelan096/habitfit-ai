const Joi = require('joi');

const fechaLocal = Joi.string()
  .pattern(/^\d{4}-\d{2}-\d{2}$/)
  .custom((value, helpers) => {
    const [year, month, day] = value.split('-').map(Number);
    const fecha = new Date(Date.UTC(year, month - 1, day));

    if (
      fecha.getUTCFullYear() !== year ||
      fecha.getUTCMonth() !== month - 1 ||
      fecha.getUTCDate() !== day
    ) {
      return helpers.error('date.invalid');
    }

    return value;
  })
  .optional()
  .messages({
    'string.pattern.base': 'La fecha local debe tener formato YYYY-MM-DD.',
    'date.invalid': 'La fecha local no es válida.'
  });

const entrenamientoValidator = (req, res, next) => {
  const schema = Joi.object({
    fechaLocal,
    ejerciciosCompletados: Joi.array().items(
      Joi.object({
        ejercicioId: Joi.string().guid({ version: ['uuidv4'] }).required().messages({
          'string.guid': 'El ejercicioId debe ser un UUID válido.',
          'any.required': 'El ejercicioId es obligatorio.'
        }),
        series: Joi.number().integer().positive().required().messages({
          'number.base': 'Las series deben ser un número.',
          'number.integer': 'Las series deben ser un número entero.',
          'number.positive': 'Las series deben ser un número positivo.',
          'any.required': 'Las series son obligatorias.'
        }),
        repeticiones: Joi.number().integer().positive().required().messages({
          'number.base': 'Las repeticiones deben ser un número.',
          'number.integer': 'Las repeticiones deben ser un número entero.',
          'number.positive': 'Las repeticiones deben ser un número positivo.',
          'any.required': 'Las repeticiones son obligatorias.'
        })
      })
    ).optional()
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ ok: false, error: error.details[0].message });
  }

  req.body = value;
  next();
};

module.exports = { entrenamientoValidator };
