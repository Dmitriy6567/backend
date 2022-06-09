const fs = require("fs/promises")
const crypto = require("crypto")
const Error = require("../error/apiError")

async function createTask(req, res, next) {
  try {
    const tasks = await fs.readFile("Tasks.json");
    const tasksList = JSON.parse(tasks);

    if (tasksList.tasks.some((task) => task.name === req.body.name)) {
      throw new Error(422,"This task is already exist")
    }

    req.body.uuid = crypto.randomBytes(16).toString("hex");
    req.body.createdAt = new Date();
    tasksList.tasks.push(req.body);
    await fs.writeFile(
      "Tasks.json",
      `${JSON.stringify(tasksList, null, 2)}`
    );

    res.status(202).json("Задача успешно добавлена");
  } catch (error) {
    next(error);
  }
}

module.exports = createTask
