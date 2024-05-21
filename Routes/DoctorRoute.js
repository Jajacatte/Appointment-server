import express from "express";
import { upload } from "../Cloudinary.js";
import asyncHandler from "express-async-handler";
import Doctors from "../Models/DoctorSchema.js";
import { protectt } from "../Middleware/AuthMiddleware.js";
import generateToken from "../Utils/GenerateToken.js";

const doctorRouter = express.Router();

doctorRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { email, lastName, firstName, password } = req.body;
    console.log(req.body);
    if (!email || !password || !firstName || !lastName) {
      res.status(400);
      throw new Error("please add all fields");
    }
    const userExist = await Doctors.findOne({ email });
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
doctorRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Doctors.findOne({ email });
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

// Route to fetch doctors data
doctorRouter.get(
  "/doctors",
  asyncHandler(async (req, res) => {
    try {
      const doctors = await Doctors.find();
      if (!doctors) {
        throw new Error("Doctors not found");
      }
      res.json(doctors);
    } catch (error) {
      throw new Error("Error fetching doctors: " + error.message);
    }
  })
);
doctorRouter.get(
  "/doctors/profile",
  protectt,
  asyncHandler(async (req, res) => {
    try {
      const doctorId = req.doctor._id;
      const doctor = await Doctors.findById(doctorId);
      if (!doctor) {
        throw new Error(`Doctor with ID ${doctorId} not found`);
      }
      res.json(doctor);
    } catch (error) {
      throw new Error(`Error fetching doctor: ${error.message}`);
    }
  })
);

doctorRouter.get(
  "/doctors/:id",
  asyncHandler(async (req, res) => {
    try {
      const doctorId = req.params.id;
      const doctor = await Doctors.findById(doctorId);
      if (!doctor) {
        throw new Error(`Doctor with ID ${doctorId} not found`);
      }
      res.json(doctor);
    } catch (error) {
      throw new Error(`Error fetching doctor: ${error.message}`);
    }
  })
);

doctorRouter.post(
  "/update", protectt,
  upload.array("files", 5),
  protectt,
  async (req, res) => {
    const doctorId = req?.doctor._id;
    const { doctorData, clinicImages, imageURL } = req.body; // Destructure doctorData, clinicImages, and imageURL
    console.log(clinicImages, imageURL);

    try {
      // Update the profileImage and clinicImages fields in
      if (imageURL) {
        doctorData.profileImage = imageURL;
      }
      if (clinicImages.length !== 0) {
        doctorData.clinicInfo.clinicImages = clinicImages;
      }

      const updatedDoctor = await Doctors.findByIdAndUpdate(
        doctorId,
        doctorData,
        { new: true }
      );

      if (!updatedDoctor) {
        throw new Error(`Doctor with ID ${doctorId} not found`);
      }

      res.json(updatedDoctor);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Error updating doctor details: ${error.message}` });
    }
  }
);

doctorRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const queryObj = { ...req.query };
      const excludeFields = [
        "page",
        "sort",
        "limit",
        "fields",
        "keyword",
        "specializations",
      ]; // Add 'search' to excludeFields
      excludeFields.forEach((el) => delete queryObj[el]);
      console.log(queryObj);

      // Add search query functionality
      if (req.query.keyword) {
        const searchField = req.query.keyword;
        queryObj.$or = [
          { firstName: { $regex: searchField, $options: "i" } }, // Replace 'field1' with the appropriate field to search in
          { lastName: { $regex: searchField, $options: "i" } },
          { userName: { $regex: searchField, $options: "i" } }, // Replace 'field2' with the appropriate field to search in
          // Add more fields to search in, if needed
        ];
      }
      if (req.query.specializations) {
        const specializations = req.query.specializations.split(",");
        queryObj["specializations.name"] = { $in: specializations };
      }

      // Create count query object
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      console.log(JSON.parse(queryStr));
      let query = Doctors.find(JSON.parse(queryStr));

      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query.sort("createdAt");
      }

      // Count documents
      const countQueryObj = JSON.parse(queryStr);
      const countQuery = { ...countQueryObj };
      const countDoc = await Doctors.countDocuments(countQuery);

      // Pagination
      const page = Number(req.query.page) || 1;
      const limit = 4;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        if (skip >= countDoc) throw new Error("This page does not exist");
      }

      const doctors = await query;
      res.json({ doctors, page, pages: Math.ceil(countDoc / limit) });
    } catch (error) {
      throw new Error(error);
    }
  })
);

// ****DOCTOR DASHBAORD*****

export default doctorRouter;
