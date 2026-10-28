const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { registrarEntrenamiento } = require('../controllers/entrenamiento.controller');

const router = Router();

router.post('/', verifyToken, registrarEntrenamiento);

module.exports = router;
