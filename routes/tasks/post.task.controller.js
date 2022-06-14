const fs = require("fs/promises")
const crypto = require("crypto")
const Error = require("../../error/apiError");
const Sequelize = require('sequelize')
const sequelize = require('../../models/index').sequelize
const Tasks = require('../../models/tasks')(sequelize, Sequelize.DataTypes, Sequelize.Model)
const Router = require("express");
const router = new Router()

async function createTask(req, res, next) {
  try {
    const tasks = await fs.readFile("../Tasks/Tasks.json");
    const tasksList = JSON.parse(tasks);

    if (tasksList.tasks.some((task) => task.name === req.body.name)) {
      throw new Error(422,"This task is already exist")
    }

    req.body.uuid = crypto.randomBytes(16).toString("hex");
    req.body.createdAt = new Date();
    tasksList.tasks.push(req.body);
    await fs.writeFile(
      "../Tasks/Tasks.json",
      `${JSON.stringify(tasksList, null, 2)}`
    );
    // const {name} = req.body
    // console.log(name)
    // const tasks = await Tasks.create({
    //   name:name
    // })

    res.status(204).json(tasks);
  } catch (err) {
    next(err);
  }
}

router.post("/postTask", createTask);

module.exports = router
