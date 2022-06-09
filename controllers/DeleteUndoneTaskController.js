const fs = require("fs/promises")

async function deleteUndoneTask (req,res) {
    const tasks = await fs.readFile("Tasks.json", "utf-8"); 
    const doneTasksList = JSON.parse(tasks);
    doneTasksList.tasks = doneTasksList.tasks.filter(post =>post.done)
    await fs.writeFile("Tasks.json", `${JSON.stringify(doneTasksList)}`);
    res.status(206).json("Успешно Удалено");
  }

module.exports=  deleteUndoneTask