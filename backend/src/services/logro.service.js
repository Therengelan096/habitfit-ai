const { Op } = require('sequelize');

const asignarLogrosPorRacha = async ({
  Achievement,
  UserAchievement,
  userId,
  rachaActual,
  transaction
}) => {
  const logros = await Achievement.findAll({
    where: { diasRacha: { [Op.lte]: rachaActual } },
    attributes: ['id'],
    transaction
  });

  if (logros.length === 0) return 0;

  await UserAchievement.bulkCreate(
    logros.map((logro) => ({ usuarioId: userId, logroId: logro.id })),
    { transaction, ignoreDuplicates: true }
  );

  return logros.length;
};

module.exports = { asignarLogrosPorRacha };
