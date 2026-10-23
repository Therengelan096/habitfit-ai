const jwt = require('jsonwebtoken');
const Joi = require('joi');
const {Usuario} = require('../models');
const userDecorator = require('../decorators/user.decorator');
const config = require('../config/config');
const hashPassword = require('../utils/hashPassword');

const register = async (req, res) => {
    try {
        const userValidator = Joi.object({
            nombre: Joi.string().required().messages({'any.required': 'El nombre es obligatorio'}),
            apellido: Joi.string().allow('', null),
            email: Joi.string().email().required().messages({'string.email': 'El correo electrónico no es válido'}),
            password: Joi.string().required().min(8).label('Password')
                .messages({'string.min': 'La contraseña debe tener al menos 8 caracteres', 'any.required': 'La contraseña es obligatoria'}),
        });

        const{error}= userValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ok: false, message: error.details[0].message});
        }

        const {nombre, apellido, password} = req.body;
        const email = req.body.email.toLowerCase();

        const existingUser = await Usuario.findOne({where: {email}});
        if (existingUser) {
            return res.status(422).json({ok: false, message: 'El correo ya se encuentra registrado'});
        }

        const hashedPassword = await hashPassword(password);

        const user= await Usuario.create({
            nombre, 
            apellido, 
            email, 
            password: hashedPassword
        });

        const secretKey = config.JWT_SECRET;
        const token = jwt.sign({id: user.id},secretKey,{
            expiresIn: '2h',
        });

        return res.status(201).json({
            ok: true,
            message: 'Usuario registrado exitosamente',
            data: {token, user: userDecorator(user)}
        });
    } catch (err) {
        console.error('Error al registrar usuario: ', err);
        return res.status(500).json({ok: false, error: 'Error al registrar un usuario'});
    }
};

const login = async (req, res) => {
    try {
        return res.status(200).json({ok: true, message: 'Endpoint de login disponible'});
    }catch (err) {
        return res.status(500).json({ok: false, error: 'Error en servidor'});
    }
};

module.exports = {register, login};