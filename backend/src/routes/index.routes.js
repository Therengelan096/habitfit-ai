const { Router } = require("express");
const nutricionRoutes = require("./nutricion.routes");
const authRoutes = require("./auth.routes");
const entrenamientoRoutes = require("./entrenamiento.routes");
const logroRoutes = require("./logro.routes");

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    ok: true,
    message: "HabitFit AI API funcionando correctamente 🚀",
  });
});

router.use("/nutricion/objetivos", nutricionRoutes);
router.use("/auth", authRoutes);
router.use("/entrenamientos", entrenamientoRoutes);
router.use("/achievements", logroRoutes);

module.exports = router;
