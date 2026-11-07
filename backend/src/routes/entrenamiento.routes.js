const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { registrarEntrenamiento } = require('../controllers/entrenamiento.controller');
const { entrenamientoValidator } = require('../validators/entrenamiento.validator');

const router = Router();

router.post('/', verifyToken, entrenamientoValidator, registrarEntrenamiento);

module.exports = router;
