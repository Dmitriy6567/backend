function Error(status,message) {
    return {
      message,
      status
    }
  }

module.exports = Error