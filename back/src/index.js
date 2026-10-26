import express from "express";
// const express = require("express");

import connectMongoDb from "./config/mongoConnection.js";
import routes from "./routes.js";

// const connectMongoDb = require("./config/mongoConnection");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(routes);

app.listen(PORT, async () => {
  try {
    await connectMongoDb();
    console.log(`Servidor Backend corriendo en puerto: ${PORT}`);
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
  }
});

export { app };