import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctors",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["scheduled", "cancelled", "completed"],
    default: "scheduled",
  },
  time: {
    type: String,
  },
  // You can add any other necessary details here
});

const Appointments = mongoose.model("Appointments", appointmentSchema);

export default Appointments;
