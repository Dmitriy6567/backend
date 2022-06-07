import fs from "fs/promises";

async function deleteAllTask (req,res) {
    const tasks = await fs.readFile("Tasks.json", "utf-8"); 
    const emptyTasksList = JSON.parse(tasks);
    emptyTasksList.tasks = []
    await fs.writeFile("Tasks.json", `${JSON.stringify(emptyTasksList)}`);
    res.status(206).json("Успешно Удалено");
  }

  export default {deleteAllTask}