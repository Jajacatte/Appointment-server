import express from "express";
import asyncHandler from "express-async-handler";
import Patients from "../Models/PatientSchema.js";
import Doctors from "../Models/DoctorSchema.js";
import { upload } from "../Cloudinary.js";
import generateToken from "./../Utils/GenerateToken.js";
import { protectPatient } from "../Middleware/AuthMiddleware.js";

const patientRouter = express.Router();

patientRouter.post(
  "/bookmark/:id",
  protectPatient,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const patientId = req.patient?._id;

    if (!id) {
      throw new Error("Doctor ID is required");
    }

    const patient = await Patients.findById(patientId);
    console.log(patient);

    if (!patient) {
      throw new Error("Patient not found");
    }

    if (patient.bookmarks.includes(id)) {
      // Remove the doctor from bookmarks
      patient.bookmarks.pull(id);
    } else {
      // Add the doctor to bookmarks
      patient.bookmarks.push(id);
    }

    await patient.save();
    res.status(200).json({ message: "Bookmark updated successfully" });
  })
);

// Register User
patientRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { email, lastName, firstName, password } = req.body;
    console.log(req.body);
    if (!email || !password || !firstName || !lastName) {
      res.status(400);
      throw new Error("please add all fields");
    }
    const userExist = await Patients.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User already exist");
    }
    const user = await Patients.create({
      email,
      firstName,
      lastName,
      password,
    });
    res.status(201).json({
      _id: user._id,
      name: user.firstName,
      email: user.lastName,
      token: generateToken(user._id),
      createdAt: user.createdAt,
    });
  })
);

// ****Login User
patientRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Patients.findOne({ email });
    if (!email || !password) {
      throw new Error("Please fill all fields");
    }
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastname: user.lastName,
        email: user.email,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  })
);

// Route to fetch patient by ID
patientRouter.get(
  "/profile",
  protectPatient,
  asyncHandler(async (req, res) => {
    const patientId = req.patient?._id;
    console.log("PPPPPPPPP", req.patient?._id);

    const patient = await Patients.findById(patientId).populate("bookmarks");

    if (!patient) {
      res.status(404);
      throw new Error("Patient not found");
    }

    res.json(patient);
  })
);



patientRouter.put(
  "/update",
  protectPatient,
  upload.array("files", 5),
  asyncHandler(async (req, res) => {
    const patientId = req.patient?._id;
    console.log("DDDDDDDDDDD", req.patient?._id);
    const user = await Patients.findById(patientId);
    if (user) {
      user.lastName = req.body.lastName || user.lastName;
      user.firstName = req.body.firstName || user.firstName;
      user.email = req.body.email || user.email;
      user.dob = req.body.dob || user.dob;
      user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      user.city = req.body.city || user.city;
      user.state = req.body.state || user.state;
      user.country = req.body.country || user.country;
      user.profileImage = req.body.profileImage || user.profileImage;

      if (req.body.password) {
        user.password = req.body.password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        lastName: updateUser.lastName,
        firstName: updateUser.firstName,
        email: updateUser.email,
        profileImage: updateUser.profileImage,
        // isAdmin: updateUser.isAdmin,
        // token: generateToken(updateUser._id),
        createdAt: updateUser.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

patientRouter.post(
  "/add-health-data", protectPatient,
  asyncHandler(async (req, res) => {
    const { newData } = req.body;

    // Find the patient by ID
    const patient = await Patients.findById(req.patient._id);

    if (!patient) {
      throw new Error("Patient not found");
    }

    // Add the new health data to the healthData array
    patient.healthData.push(newData);

    // Save the updated patient
    const updatedPatient = await patient.save();

    res.status(201).json({
      message: "Health data added successfully",
      patient: updatedPatient,
    });
  })
);



export default patientRouter;
