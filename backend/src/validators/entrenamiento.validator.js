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
  .required()
  .messages({
    'string.empty': 'La fecha local es obligatoria.',
    'any.required': 'La fecha local es obligatoria.',
    'string.pattern.base': 'La fecha local debe tener formato YYYY-MM-DD.',
    'date.invalid': 'La fecha local no es válida.'
  });

const entrenamientoValidator = (req, res, next) => {
  const { error, value } = Joi.object({ fechaLocal }).validate(req.body);

  if (error) {
    return res.status(400).json({ ok: false, message: error.details[0].message });
  }

  req.body = value;
  next();
};

module.exports = { entrenamientoValidator };
