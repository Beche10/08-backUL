import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {    
    });

    console.log("Database has been connected.");

    } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos.");
  }
};
