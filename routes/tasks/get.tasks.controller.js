const fs = require("fs/promises");
const Sequelize = require('sequelize')
const sequelize = require('../../models/index').sequelize
const Tasks = require('../../models/tasks')(sequelize, Sequelize.DataTypes, Sequelize.Model)
const Router = require("express");
const router = new Router()
async function getTasks(req, res, next) {
  try {
    const { filter, sort, page } = req.query;
    const tasks = await fs.readFile("../Tasks/Tasks.json");
     const tasksList = JSON.parse(tasks)

    // const model = await Tasks.findAndCountAll({limit: 5, offset: page})

    const reverseAndFilter = () => {
      const resultTasksList = [...tasksList.tasks].filter((item) => {
        switch (filter) {
          case "all":
            return true;
          case "done":
            return item.done === true;
          case "undone":
            return item.done === false;
        }
      });
      return (
        (sort === "new" && resultTasksList.reverse()) ||
        (sort === "old" && resultTasksList)
      );
    };
    const countPage = reverseAndFilter().length;
    const result = reverseAndFilter().slice((page - 1) * 5, page * 5);

    // const count = model.count;
    // const task = model.rows
    res.status(202).send( {result, countPage});
    
  } catch (err) {
    next(err);
  }
}
router.get("/postTask", getTasks)
module.exports =  router ;