const { Router } = require("express");
const { getObjetivos, updateObjetivos } = require("../controllers/nutricion.controller");

const router = Router();

const validarUUID = (req, res, next) => {
  const id = req.query.usuarioId || req.body.usuarioId;
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  if (!id || !uuidRegex.test(id)) {
    return res.status(400).json({ ok: false, error: 'El usuarioId es inválido o no fue enviado.' });
  }
  next();
};

router.get("/", validarUUID, getObjetivos);
router.put("/", validarUUID, updateObjetivos);

module.exports = router;