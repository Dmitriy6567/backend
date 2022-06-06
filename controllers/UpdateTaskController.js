import fs from "fs/promises";

async function updateTask(req, res) {
    const { uuid } = req.params;
    const tasks = await fs.readFile("../Tasks/Tasks.json");
    const updateTasksList = JSON.parse(tasks);
  
    updateTasksList.tasks.map((item) => {
      if (item.uuid === uuid) {
        if (req.body.name) {
          item.name = req.body.name;
        }
        if (req.body.done!==undefined) {
          item.done = req.body.done;
        }
      }
    });
    await fs.writeFile("../Tasks/Tasks.json", `${JSON.stringify(updateTasksList,null,2)}`);
    res.status(204).json("Успешно отредактировано");
  }

  export default {updateTask}