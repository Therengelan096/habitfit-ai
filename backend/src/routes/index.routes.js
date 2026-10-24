const { Router } = require("express");
const nutricionRoutes = require("./nutricion.routes");
const authRoutes = require("./auth.routes");

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    ok: true,
    message: "HabitFit AI API funcionando correctamente 🚀",
  });
});

router.use("/nutricion/objetivos", nutricionRoutes);
router.use("/auth", authRoutes);

module.exports = router;
