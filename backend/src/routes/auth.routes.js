const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const { registerValidator, loginValidator } = require('../validators/auth.validator');
const { verifyToken } = require('../middlewares/auth.middleware');

const router = Router();

router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);

router.get('/me', verifyToken, (req, res) => {
    return res.status(200).json({
        ok: true,
        message: 'Acceso concedido.',
        data: {
            usuarioId: req.user.id
        }
    });
});

module.exports = router;