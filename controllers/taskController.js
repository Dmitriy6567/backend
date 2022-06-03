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

  arrMass.tasks.map((item) => {
    if (item.uuid === uuid) {
      if (req.body.name) {
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
  const { filter, sort, page } = req.query;

  let reverseAndFilter = () => {
    let arr = [...arrMass.tasks].filter(item => {
      switch(filter){
        case "all":
          return true
        case 'done':
         return item.done===true
        case 'undone':
         return  item.done===false
      }
    })
    return (sort==='new' && arr.reverse() || sort==='old' && arr)
  }
  const countPage = reverseAndFilter().length
  const result = reverseAndFilter().slice((page-1)*5,page*5)
  
  res.json({result,countPage})

}

export default { createTask, updateTask, deleteTask, getTasks };
