import express from "express";
import  router  from "./routes/taskRoute.js";
import dotenv from "dotenv"

dotenv.config()

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use('/postTask',router)
app.listen(PORT, () => console.log(`Сервер запущен! Порт ${PORT}`));
