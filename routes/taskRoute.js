import express from "express";
import taskController from "../controllers/taskController.js";

const router = express.Router();

router.post("/", taskController.createTask);

router.patch("/:uuid",taskController.updateTask)

router.delete("/:uuid", taskController.deleteTask)

router.get("/", taskController.getTasks)


export default router