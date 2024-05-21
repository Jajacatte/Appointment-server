import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./Config/MongoDb.js";
import importData from "./DataImports.js";
import morgan from "morgan";
import cors from "cors";
import { errorHandler, notFound } from "./Middleware/Error.js";
import doctorRouter from "./Routes/DoctorRoute.js";
import patientRouter from "./Routes/PatientRoute.js";
import appointmentRouter from "./Routes/AppointmentRoute.js";
// import appointmentRouter from "./Routes/AppointmentRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan());
app.use("/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/import", importData);
app.use("/api/appointment", appointmentRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/patient", patientRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_URL);
    app.listen(PORT, console.log(`server is running on port ${PORT}.......`));
  } catch (error) {
    console.log(error);
  }
};
start();
