import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import Patients from "../Models/PatientSchema.js";
import Doctors from "./../Models/DoctorSchema.js";

// Middleware for protecting routes accessible only to parents
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.patient = await Patients.findById(decoded.id).select("-password");
      // console.log("THIS IS THE PATIENT ID",req?.patient?._id)
      // console.log("Patient details:", req.patient); // Log patient details

      next();
    } else {
      throw new Error("Not Authorized, no token provided");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Not Authorized", error: error.message });
  }
});

// Middleware for protecting routes accessible only to children
export const protectt = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.doctor = await Doctors.findById(decoded.id).select("-password");
      next();
    } else {
      throw new Error("Not Authorized, no token provided");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Not Authorized", error: error.message });
  }
});

