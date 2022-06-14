const fs = require("fs/promises")
const Router = require("express");
const router = new Router()

async function deleteAllTask (req,res) {
    const { del } = req.query;
    const tasks = await fs.readFile("../Tasks/Tasks.json", "utf-8"); 
    const emptyTasksList = JSON.parse(tasks);
    switch (del){
      case 'Clear all':
        emptyTasksList.tasks = [];
        break;
      case 'Clear done':
        emptyTasksList.tasks = emptyTasksList.tasks.filter(post =>!post.done);
        break;
      case 'Clear undone':
        emptyTasksList.tasks = emptyTasksList.tasks.filter(post =>post.done);
        break;
    }
    await fs.writeFile("../Tasks/Tasks.json", `${JSON.stringify(emptyTasksList)}`);
    res.status(206).json("Успешно Удалено");
  }
  router.delete("/postTask",deleteAllTask)
  module.exports = router