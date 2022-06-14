const Sequelize = require('sequelize')
const sequelize = require('../../models/index').sequelize
const Tasks = require('../../models/tasks')(sequelize, Sequelize.DataTypes, Sequelize.Model)
const Router = require("express");
const router = new Router()

async function deleteTask(req, res) {
    await Tasks.destroy({where: {uuid: req.params.uuid}})
    res.status(206).json("Успешно Удалено");
  }

router.delete("/postTask/:uuid",deleteTask)
module.exports = router
