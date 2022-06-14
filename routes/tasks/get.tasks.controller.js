const Sequelize = require("sequelize");
const sequelize = require("../../models/index").sequelize;
const Tasks = require("../../models/tasks")(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);
const Router = require("express");
const router = new Router();
async function getTasks(req, res, next) {
  try {
    const { filter, sort, page } = req.query;

    const where = {};
    switch (filter) {
      case "done":
        where.done = true;
        break;
      case "undone":
        where.done = false;
        break;
      default:
        break;
    }
    const model = await Tasks.findAndCountAll({
      where,
      limit: 5,
      offset: page * 5 - 5,
      order: [["createdAt", sort]],
    });
    const countPage = model.count;
    const task = model.rows;
    res.status(202).send({ task, countPage });
  } catch (err) {
    next(err);
  }
}
router.get("/postTask", getTasks);
module.exports = router;
