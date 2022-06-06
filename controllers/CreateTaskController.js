import crypto from "crypto";
import fs from "fs/promises";

async function createTask(req, res) {
    const tasks = await fs.readFile("../Tasks/Tasks.json");
    const tasksList = JSON.parse(tasks);
    console.log(tasksList)
    // console.log(req.body.name)
    req.body.uuid = crypto.randomBytes(16).toString("hex");
    req.body.createdAt = new Date();
    tasksList.tasks.push(req.body);
    await fs.writeFile("../Tasks/Tasks.json", `${JSON.stringify(tasksList, null, 2)}`);
    res.status(202).json("Успешно");
  }

  export default {createTask}