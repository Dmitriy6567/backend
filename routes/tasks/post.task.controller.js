const Error = require("../../error/apiError.js");
const Sequelize = require("sequelize");
const sequelize = require("../../models/index").sequelize;
const Tasks = require("../../models/tasks")(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);
const Router = require("express");
const router = new Router();

async function createTask(req, res, next) {
  try {
    await Tasks.findOrCreate({ where: { name: req.body.name } }).then(
      function (result) {
        const tasks = result[0],
          created = result[1];

        if (!created) {
          throw new Error(422, "This task is already exist");
        }

        res.status(204).json(tasks);
      }
    );
  } catch (err) {
    next(err);
  }
}

router.post("/postTask", createTask);

module.exports = router;
