const Router = require("express");
const router = new Router();
const Sequelize = require("sequelize");
const sequelize = require("../../models/index").sequelize;
const Tasks = require("../../models/tasks")(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);

async function deleteAllTask(req, res) {
  const { del } = req.query;
  switch (del) {
    case "Clear all":
      await Tasks.destroy({ where: {}, truncate: true });
      break;
    case "Clear done":
      await Tasks.destroy({ where: { done: true } });
      break;
    case "Clear undone":
      await Tasks.destroy({ where: { done: false } });
      break;
  }
  res.status(206).json("Успешно Удалено");
}
router.delete("/postTask", deleteAllTask);
module.exports = router;
