// import express from "express";
// import router from "./routes/taskRoute.js";
// import dotenv from "dotenv";
// import cors from "cors";

const express = require("express")
const router = require("./routes/taskRoute.js")
const cors = require("cors")
// dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
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

app.listen(PORT, () => console.log(`Сервер запущен! Порт ${PORT}`));
