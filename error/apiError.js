import express from "express";

function MyError(status,message) {
    this.message = message;
    this.status = status
  }

export default {MyError}