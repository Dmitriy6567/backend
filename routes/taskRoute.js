const Router = require("express");
const router = new Router()
const GetTaskController = require("../controllers/GetTaskController.js")
const CreateTaskController = require("../controllers/CreateTaskController.js")
const UpdateTaskController = require("../controllers/UpdateTaskController.js")
const DeleteTaskContoller = require("../controllers/DeleteTaskContoller.js")
const DeleteAllTaskController = require("../controllers/DeleteAllTaskController.js")
const DeleteDoneTaskController = require("../controllers/DeleteDoneTaskController.js")
const DeleteUndoneTaskController = require("../controllers/DeleteUndoneTaskController.js")

router.get("/", GetTaskController)

router.post("/", CreateTaskController);

router.patch("/:uuid",UpdateTaskController)

router.delete("/:uuid", DeleteTaskContoller)

router.post("/deleteAll", DeleteAllTaskController)

router.post("/deleteDone", DeleteDoneTaskController)

router.post("/deleteUndone", DeleteUndoneTaskController)

module.exports = router