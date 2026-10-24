const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Usuario} = require('../models');
const userDecorator = require('../decorators/user.decorator');
const config = require('../config/config');
const hashPassword = require('../utils/hashPassword');

const register = async (req, res) => {
    try {
        const {nombre, apellido, email, password} = req.body;

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
        return res.status(500).json({ok: false, error: 'Error interno al registrar un usuario'});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await Usuario.findOne({where: {email}});

        if (!user) {
            await bcrypt.compare(password, '$2b$10$X8a/yE1n9Zf5rG6h.uDq.O/1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J');
            return res.status(401).json({ok: false, message: 'Credenciales incorrectas'});
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ok: false, message: 'Credenciales incorrectas'});
        }

        const secretKey = config.JWT_SECRET;
        const token = jwt.sign({id: user.id}, secretKey, {
            expiresIn: '2h',
        });

        return res.status(200).json({
            ok: true,
            message: 'Inicio de sesión exitoso',
            data: {token, user: userDecorator(user)}
        });
    }catch (err) {
        console.error('Error en login: ', err);
        return res.status(500).json({ok: false, error: 'Error interno del servidor'});
    }
};

module.exports = {register, login};