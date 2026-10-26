import express from "express";

import connectMongoDb from "./config/mongoConnection.js";
import routes from "./routes.js";


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