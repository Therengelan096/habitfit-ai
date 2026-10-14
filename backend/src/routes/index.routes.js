const { Router } = require("express");
const router = Router();

router.get("/health", (req, res) => {
  res.json({
    ok: true,
    message: "HabitFit AI API funcionando correctamente 🚀",
  });
});

module.exports = router;
