const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
            ok: false,
            message: 'Acceso denegado. Formato de token inválido o ausente. Use "Bearer <token>".'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET, { algorithms: ['HS256'] });
        req.user = decoded;
        next();
    } catch (error) {
        const message = error.name === 'TokenExpiredError'
            ? 'El token ha expirado. Por favor, inicie sesión nuevamente.'
            : 'Token inválido o corrupto.';

        return res.status(401).json({ ok: false, message });
    }
};

module.exports = { verifyToken };