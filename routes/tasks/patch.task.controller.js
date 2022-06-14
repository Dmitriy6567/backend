const Error = require("../../error/apiError")
const Router = require("express");
const router = new Router()
const Sequelize = require('sequelize')
const sequelize = require('../../models/index').sequelize
const Tasks = require('../../models/tasks')(sequelize, Sequelize.DataTypes, Sequelize.Model)

async function updateTask(req, res,next) {
  try{
    const { uuid } = req.params;
    // updateTasksList.tasks.map((item) => {
    //   if (item.uuid === uuid) {
    //     if (req.body.name) {
    //       if (updateTasksList.tasks.some((task) => task.name === req.body.name)) {
    //         throw new Error(415,"Error editing, this task is already exist")
    //       } 
    //       if (req.body.name.match(/^[ ]+$/)){
    //         throw new Error(416,"Error editing, can't save empty task")
    //       }
    //         item.name = req.body.name.trim();
    //     }
    //     if (req.body.done!==undefined) {
    //       item.done = req.body.done;
    //     }
    //   }
    // });

    await Tasks.update(req.body,{where: {uuid}})
    res.status(204).json("Успешно отредактировано");
  } catch(error){
    next(error);
  }
  }
  router.patch("/postTask/:uuid", updateTask)
  module.exports = router