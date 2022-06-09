const fs = require("fs/promises")

async function getTasks(req, res) {
  try {
    const { filter, sort, page } = req.query;
    const tasks = await fs.readFile("Tasks.json");
    const tasksList = JSON.parse(tasks);
    let reverseAndFilter = () => {
      let resultTasksList = [...tasksList.tasks].filter((item) => {
        switch (filter) {
          case "all":
            return true;
          case "done":
            return item.done === true;
          case "undone":
            return item.done === false;
        }
      });
      return (
        (sort === "new" && resultTasksList.reverse()) ||
        (sort === "old" && resultTasksList)
      );
    };
    const countPage = reverseAndFilter().length;
    const result = reverseAndFilter().slice((page - 1) * 5, page * 5);
    res.json({ result, countPage });
  } catch (error) {
    console.log(error);
  }
}

module.exports =  getTasks ;
