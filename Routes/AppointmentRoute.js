import express from "express";
import asyncHandler from "express-async-handler";
import Appointments from "../Models/AppointmentSchema.js";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import cron from "node-cron";
import { protect, protectt } from "../Middleware/AuthMiddleware.js";
import moment from "moment";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const appointmentRouter = express.Router();

appointmentRouter.get(
  "/booked-appointments/:id",
  protect,
  asyncHandler(async (req, res) => {
    const doctorId = req.params.id;
    const { date } = req.query;

    try {
      // Parse the date string into a moment object
      const selectedDate = moment(date, "YYYY-MM-DD");

      // Find all appointments for the specified doctor on the given date
      const bookedAppointments = await Appointments.find({
        doctorId,
        date: selectedDate.toDate(), // Convert moment object to JavaScript Date object
      });

      res.json({ bookedAppointments });
    } catch (error) {
      console.error("Error fetching booked appointments:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

// Route to fetch appointments for a patient
appointmentRouter.get(
  "/appointments/patient",
  protect, // Ensure protectPatient middleware executes first
  asyncHandler(async (req, res) => {
    const patientId = req?.patient?._id;
    console.log("THIS IS THE PATIENT ID FOR APP", patientId); // Log patientId here

    if (!patientId) {
      throw new Error("Patient ID is required");
    }

    // Fetch appointments for the given patient ID and populate the 'doctor' field
    const appointments = await Appointments.find({
      patient: patientId,
    }).populate("doctor");

    res.status(200).json({ appointments });
  })
);
appointmentRouter.get(
  "/appointments/doctor",
  protectt,
  asyncHandler(async (req, res) => {
    const doctorId = req.doctor._id;

    if (!doctorId) {
      throw new Error("Doctor ID is required");
    }

    // Fetch appointments for the given doctor ID
    const appointments = await Appointments.find({ doctor: doctorId }).populate(
      "patient"
    );

    res.status(200).json({ appointments });
  })
);

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

console.log("REFRESH TOKEN", REFRESH_TOKEN);

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const { tokens } = await oAuth2Client.refreshToken(REFRESH_TOKEN);
    oAuth2Client.setCredentials(tokens);
    console.log("Access token refreshed successfully.");
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Failed to refresh access token.");
  }
};

// Function to check token expiration and refresh if necessary
const checkAndRefreshToken = async () => {
  try {
    const accessToken = oAuth2Client.getAccessToken();
    const expiryDate = oAuth2Client.credentials.expiry_date;
    const currentTime = new Date().getTime();

    // Refresh token if it's close to expiry or has already expired
    if (!accessToken || (expiryDate && currentTime >= expiryDate - 60000)) {
      await refreshAccessToken();
    }
  } catch (error) {
    console.error("Error checking or refreshing token:", error);
    throw new Error("Failed to check or refresh token.");
  }
};

// Function to set OAuth2 credentials with token refresh logic
const setOAuthCredentials = async () => {
  try {
    await oAuth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN,
    });
    console.log("OAuth credentials set successfully.");
  } catch (error) {
    console.error("Error setting OAuth credentials:", error);
    throw new Error("Failed to set OAuth credentials.");
  }
};

// Function to send email
const sendEmail = async (toEmail, subject, text) => {
  try {
    await setOAuthCredentials(); // Ensure OAuth credentials are set before sending emails

    await checkAndRefreshToken(); // Check and refresh token if needed

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "davidodimayo7@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "davidodimayo7@gmail.com",
      to: "jajacatte@gmail.com",
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};

// Route to book appointment
appointmentRouter.post(
  "/book-appointment",
  protect,
  asyncHandler(async (req, res) => {
    const { doctorId, date, time, status } = req.body;
    const patientId = req?.patient._id;

    if (!patientId || !doctorId || !date || !time) {
      throw new Error("All fields are required");
    }

    // Check if there are any existing appointments for the given patient and doctor with future dates
    const existingAppointment = await Appointments.findOne({
      patient: patientId,
      doctor: doctorId,
      date: { $gte: new Date() }, // Find appointments with date greater than or equal to today
    });

    if (existingAppointment) {
      throw new Error(
        "You already have an appointment with this doctor in the future."
      );
    }

    // Create a new appointment
    const appointment = new Appointments({
      patient: patientId,
      doctor: doctorId,
      date: date,
      time: time,
      status: status || "scheduled", // Default status to "scheduled" if not provided
    });

    // Save the appointment to the database
    await appointment.save();

    // Compose email message for doctor
    const doctorEmailSubject = "New Appointment Booked";
    const doctorEmailText = `A new appointment has been booked with you. Date: ${date}, Time: ${time}.`;

    // Send email to the doctor
    await sendEmail(appointment, doctorEmailSubject, doctorEmailText);

    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  })
);

// Route to accept appointment
appointmentRouter.put(
  "/appointments/accept/:appointmentId",
  protectt,
  asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      throw new Error("Appointment ID is required");
    }

    // Find the appointment by ID and update its status to "completed"
    await Appointments.findByIdAndUpdate(appointmentId, {
      status: "completed",
    });

    // Fetch appointment details and doctor information
    const appointment = await Appointments.findById(appointmentId)
      .populate("doctor")
      .populate("patient");

    // Compose email message
    const subject = "Appointment Accepted";
    const text = `Dear ${appointment.patient.firstName} ${appointment.patient.lastName},\n\nYour appointment with Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName} has been accepted.\n\nAppointment Details:\nDate: ${appointment.date}\nTime: ${appointment.time}\nStatus: ${appointment.status}\n\nThank you!`;

    // Send the email
    await sendEmail(appointment, subject, text);

    res.status(200).json({ message: "Appointment accepted successfully" });
  })
);

// Route to cancel appointment
appointmentRouter.put(
  "/appointments/cancel/:appointmentId",
  protectt,
  asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      throw new Error("Appointment ID is required");
    }

    // Find the appointment by ID and update its status to "cancelled"
    await Appointments.findByIdAndUpdate(appointmentId, {
      status: "cancelled",
    });

    const appointment = await Appointments.findById(appointmentId)
      .populate("doctor")
      .populate("patient");
    // Compose email message
    const subject = "Appointment Accepted";
    const text = `Dear ${appointment.patient.firstName} ${appointment.patient.lastName},\n\nYour appointment with Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName} has been rejected.\n\nAppointment Details:\nDate: ${appointment.date}\nTime: ${appointment.time}\nStatus: ${appointment.status}\n\n So sorry!`;

    await sendEmail(appointment, subject, text);
    res.status(200).json({ message: "Appointment cancelled successfully" });
  })
);
appointmentRouter.get(
  "/appointments/scheduled",
  protectt,
  asyncHandler(async (req, res) => {
    const doctorId = req.doctor._id;

    // Fetch appointments with status 'scheduled' for the specified doctor
    const appointments = await Appointments.find({
      status: "scheduled",
      doctor: doctorId,
    }).populate("patient");

    res.status(200).json({ appointments });
  })
);

appointmentRouter.post(
  "/schedule-reminder",
  asyncHandler(async (req, res) => {
    // Schedule reminder emails for appointments
    try {
      // Fetch appointments scheduled for the next 3 days
      const currentDate = new Date();
      const threeDaysLater = new Date(currentDate);
      threeDaysLater.setDate(threeDaysLater.getDate() + 3);

      const appointments = await Appointments.find({
        date: { $gte: currentDate, $lt: threeDaysLater },
      })
        .populate("doctor")
        .populate("patient");

      // Schedule reminder emails for each appointment
      appointments.forEach((appointment) => {
        // Schedule reminder emails 3, 2, 1 days before the appointment
        const reminderDates = [
          new Date(appointment.date.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days before
          new Date(appointment.date.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days before
          new Date(appointment.date.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day before
          appointment.date, // On the day of the appointment
        ];

        // Schedule emails
        reminderDates.forEach((date) => {
          cron.schedule(
            date,
            async () => {
              // Compose email message
              const emailSubject = "Appointment Reminder";
              const emailText = `This is a reminder for your appointment on ${appointment.date}.`;

              // Send email to the patient
              await sendEmail(
                appointment.patient.email,
                emailSubject,
                emailText
              );

              // Send email to the doctor
              await sendEmail(
                appointment.doctor.email,
                emailSubject,
                emailText
              );
            },
            { scheduled: true }
          );
        });
      });

      res
        .status(200)
        .json({ message: "Reminder emails scheduled successfully" });
    } catch (error) {
      console.error("Error scheduling reminder emails:", error);
      res.status(500).json({ error: "Failed to schedule reminder emails" });
    }
  })
);

export default appointmentRouter;
