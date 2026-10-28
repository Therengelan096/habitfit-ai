const Joi = require('joi');

const registerValidator = (req, res, next) => {
    const schema = Joi.object({
        nombre: Joi.string().required().messages({
            'string.empty': 'El nombre no puede estar vacío',
            'any.required': 'El nombre es obligatorio'
        }),
        apellido: Joi.string().allow('', null),
        email: Joi.string().email().trim().lowercase().required().messages({
            'string.empty': 'El correo no puede estar vacío',
            'string.email': 'El correo electrónico no es válido',
            'any.required': 'El correo es obligatorio'
        }),
        password: Joi.string().required().min(8).messages({
            'string.empty': 'La contraseña no puede estar vacía',
            'string.min': 'La contraseña debe tener al menos 8 caracteres',
            'any.required': 'La contraseña es obligatoria'
        })
    });

    const {error, value} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ok: false, message: error.details[0].message});
    }

    req.body = value;
    next();
};

const loginValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().trim().lowercase().required().messages({
            'string.empty': 'El correo no puede estar vacío.',
            'string.email': 'Formato de correo inválido.',
            'any.required': 'El correo es obligatorio.'
        }),
        password: Joi.string().required().messages({
            'string.empty': 'La contraseña no puede estar vacía.',
            'any.required': 'La contraseña es obligatoria.'
        })
    });

    const {error, value} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ok: false, message: error.details[0].message});
    }

    req.body = value;
    next();
};

module.exports = {registerValidator, loginValidator};