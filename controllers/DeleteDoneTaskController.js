const fs = require("fs/promises")

async function deleteDoneTask (req,res) {
    const tasks = await fs.readFile("Tasks.json", "utf-8"); 
    const undoneTasksList = JSON.parse(tasks);
    undoneTasksList.tasks = undoneTasksList.tasks.filter(post =>!post.done)
    await fs.writeFile("Tasks.json", `${JSON.stringify(undoneTasksList)}`);
    res.status(206).json("Успешно Удалено");
  }

module.exports = deleteDoneTask