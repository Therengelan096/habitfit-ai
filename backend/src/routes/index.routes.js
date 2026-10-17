const { Router } = require("express");
const nutricionRoutes = require("./nutricion.routes");

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    ok: true,
    message: "HabitFit AI API funcionando correctamente 🚀",
  });
});

router.use("/nutricion/objetivos", nutricionRoutes);

module.exports = router;
