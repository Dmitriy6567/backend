import fs from "fs/promises";
import apiError from '../error/apiError.js'

async function updateTask(req, res,next) {
  try{
    const { uuid } = req.params;
    const tasks = await fs.readFile("Tasks.json");
    const updateTasksList = JSON.parse(tasks);
  
    updateTasksList.tasks.map((item) => {
      if (item.uuid === uuid) {
        if (req.body.name) {
          if (updateTasksList.tasks.some((task) => task.name === req.body.name)) {
            throw new apiError.MyError(415,"Error editing, this task is already exist")
          }
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

  export default {updateTask}