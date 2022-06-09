import express from "express";
import router from "./routes/taskRoute.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const CORS = cors();
const app = express();
app.use(express.json());
app.use(CORS);
const PORT = process.env.PORT || 3002;

app.use("/postTask", router)

app.use(function (err, req, res, next) {
  res.status(err.status).send({
    response: {
      message: err.message,
      code:err.status
    },
  }); 
});

// database: 'todolist';
// user: 'user';
// password: 'root';
// host: 'localhost'
// post: "5432";

app.listen(PORT, () => console.log(`Сервер запущен! Порт ${PORT}`));
