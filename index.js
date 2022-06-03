import express from "express";
import  router  from "./routes/taskRoute.js";
import dotenv from "dotenv"
import cors from 'cors' 
dotenv.config()

const CORS = cors()
const app = express();
app.use(express.json());
app.use(CORS)
const PORT = process.env.PORT || 3000;

app.use('/postTask',router)
app.listen(PORT, () => console.log(`Сервер запущен! Порт ${PORT}`));
