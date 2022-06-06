import fs from "fs/promises";

async function deleteTask(req, res) {
    const tasks = await fs.readFile("../Tasks/Tasks.json", "utf-8");
    const tasksList = JSON.parse(tasks);
    const { uuid } = req.params;
    tasksList.tasks = tasksList.tasks.filter((post) => post.uuid !== uuid);
    await fs.writeFile("../Tasks/Tasks.json", `${JSON.stringify(tasksList,null,2)}`);
    res.status(206).json("Успешно Удалено");
  }

  export default {deleteTask}