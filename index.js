const express = require("express")
const cors = require("cors")
const recursive = require('recursive-readdir-sync')
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3002;

recursive(`${__dirname}/routes`).forEach(async (file) => {
  const router = await import(file)
  app.use('/',router.default)
});

app.use(function (err, req, res, next) {
  res.status(err.status).send({
    response: {
      message: err.message,
      code:err.status
    },
  }); 
});

app.listen(PORT, () => console.log(`Сервер запущен! Порт ${PORT}`));
