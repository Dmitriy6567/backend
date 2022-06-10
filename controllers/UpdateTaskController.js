const fs = require("fs/promises")
const Error = require("../error/apiError")

async function updateTask(req, res,next) {
  try{
    const { uuid } = req.params;
    const tasks = await fs.readFile("Tasks.json");
    const updateTasksList = JSON.parse(tasks);
  
    updateTasksList.tasks.map((item) => {
      if (item.uuid === uuid) {
        if (req.body.name) {
          if (updateTasksList.tasks.some((task) => task.name === req.body.name)) {
            throw new Error(415,"Error editing, this task is already exist")
          } 
          // if (req.body.name===''){
          //   throw new Error(416,"Error editing, can't save empty task")
          // }
            item.name = req.body.name;
        }
        if (req.body.done!==undefined) {
          item.done = req.body.done;
        }
      }
    });
    await fs.writeFile("Tasks.json", `${JSON.stringify(updateTasksList,null,2)}`);
    res.status(204).json("Успешно отредактировано");
  } catch(error){
    next(error);
  }
  }

  module.exports = updateTask