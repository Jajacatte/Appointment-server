import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define Schema for Education
const educationSchema = new mongoose.Schema({
  degree: String,
  year: Number,
  college: String,
});

// Define Schema for Experience
const experienceSchema = new mongoose.Schema({
  organization: String,
  from: Date,
  to: Date,
  designation: String,
});

// Define Schema for Awards
const awardSchema = new mongoose.Schema({
  name: String,
  year: Number,
  details: String,
});

// Define Schema for Clinic Information
const clinicSchema = new mongoose.Schema({
  name: String,
  title: String,
  ratings: Number,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,

  clinicImages: [String],
  timings: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String,
  },
  price: {
    type: Number,
  },
});

// Define Schema for Reviews
const reviewSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Define Schema for Business Hours
const businessHoursSchema = new mongoose.Schema({
  day: String,
  startTime: String,
  endTime: String,
});

const doctorSchema = new mongoose.Schema({
  aboutMe: String,
  education: [educationSchema],
  experience: [experienceSchema],
  awards: [awardSchema],
  services: [],
  specializations: [],
  clinicInfo: clinicSchema,
  pricing: Number,
  reviews: [reviewSchema],
  businessHours: [businessHoursSchema],
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  gender: String,
  dateOfBirth: Date,
  profileImage: String,
  rating: String,
  field: String,
  location: String,
  password: {
    type: String,
    required: true,
  },
});

doctorSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


const Doctors = mongoose.model("Doctors", doctorSchema);

export default Doctors;
