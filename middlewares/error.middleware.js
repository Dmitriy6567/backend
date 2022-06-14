function errorHandler (err, req, res, next){
    res.status(err.status).send({
      response: {
        message: err.message,
        code:err.status
      },
    });
  }

  module.exports = errorHandler