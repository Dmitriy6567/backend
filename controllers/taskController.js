import crypto from "crypto";
import fs from "fs/promises";

const tasks = await fs.readFile("Tasks.json", "utf-8");

const arrMass = JSON.parse(tasks);

function createTask(req, res) {
  if (req.body.name === "") {
    resresponse.status(400).json("Неверный запрос");
  }
  req.body.uuid = crypto.randomBytes(16).toString("hex");
  req.body.createdAt = new Date();
  arrMass.tasks.push(req.body);
  fs.writeFile("Tasks.json", `${JSON.stringify(arrMass)}`);
  res.status(202).json("Успешно");
}

function updateTask(req, res) {
  const { uuid } = req.params;

  arrMass.tasks.findIndex((item) => {
    if (item.uuid === uuid) {
      if (item.name !== req.body.name) {
        item.name = req.body.name;
      }
      if (item.done !== req.body.done) {
        item.done = req.body.done;
      }
    }
  });
  fs.writeFile("Tasks.json", `${JSON.stringify(arrMass)}`);
  res.status(204).json("Успешно отредактировано");
}

function deleteTask(req, res) {
  const { uuid } = req.params;
  arrMass.tasks = arrMass.tasks.filter((post) => post.uuid !== uuid);
  fs.writeFile("Tasks.json", `${JSON.stringify(arrMass)}`);
  res.status(206).json("Успешно Удалено");
}

function getTasks(req, res) {
  const { filter, sort, page, limit } = req.query;
  res.send(`Запрос получен`);
  console.log(filter, sort, page, limit);
  if (sort === "new") {
    if(filter==='all'){
      console.log([...arrMass.tasks].reverse())
    } else if (filter==='done'){
      console.log(arrMass.tasks.reverse().filter(item=>item.done===true))
    } else if (filter==='undone'){
      console.log(arrMass.tasks.reverse().filter(item=>item.done===false))
    }
  } else if (sort === "old") {
    if (filter === "all") {
      console.log(arrMass.tasks);
    } else if (filter === "done") {
      console.log(arrMass.tasks.filter(item=>item.done===true))
    } else if (filter === "undone") {
      console.log(arrMass.tasks.filter(item=>item.done===false))
    }
  }
}

export default { createTask, updateTask, deleteTask, getTasks };
