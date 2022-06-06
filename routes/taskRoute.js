import express from "express";
import GetTaskController from "../controllers/GetTaskController.js";
import CreateTaskController from "../controllers/CreateTaskController.js";
import UpdateTaskController from "../controllers/UpdateTaskController.js";
import DeleteTaskContoller from "../controllers/DeleteTaskContoller.js";
import DeleteAllTaskController from "../controllers/DeleteAllTaskController.js";
import DeleteDoneTaskController from "../controllers/DeleteDoneTaskController.js";
import DeleteUndoneTaskController from "../controllers/DeleteUndoneTaskController.js";

const router = express.Router();

router.post("/", CreateTaskController.createTask);

router.patch("/:uuid",UpdateTaskController.updateTask)

router.delete("/:uuid", DeleteTaskContoller.deleteTask)

router.post("/deleteAll", DeleteAllTaskController.deleteAllTask)

router.post("/deleteDone", DeleteDoneTaskController.deleteDoneTask)

router.post("/deleteUndone", DeleteUndoneTaskController.deleteUndoneTask)

router.get("/", GetTaskController.getTasks)


export default router