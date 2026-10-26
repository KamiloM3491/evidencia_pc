import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/pequenas_criaturas");
    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    throw error;
  }
};

export default connectMongoDb;