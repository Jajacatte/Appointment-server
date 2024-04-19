import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define Schema for Patient
const patientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
    },
    dob: { type: Date},
    bloodGroup: { type: String },
    phone: { type: String },
    profileImage: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String },
    address: { type: String },
    location: { type: String },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctors" }],
    healthData: [
      {
        date: { type: Date, required: true },
        bmi: { type: Number },
        heartRate: { type: Number },
        weight: { type: Number },
        fbcStatus: { type: String },
        bodyTemp: { type: Number },
        bloodPressure: { type: String },
        glucoseLevel: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

patientSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};
patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Patients = mongoose.model("Patients", patientSchema);

export default Patients;
