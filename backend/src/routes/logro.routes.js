const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { listarLogros } = require('../controllers/logro.controller');

const router = Router();

router.get('/', verifyToken, listarLogros);

module.exports = router;
