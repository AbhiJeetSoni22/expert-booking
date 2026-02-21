import express from "express";
import {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/bookings
router.post("/", createBooking);

// GET /api/bookings?email=
router.get("/", getBookingsByEmail);

// PATCH /api/bookings/:id/status
router.patch("/:id/status", updateBookingStatus);

export default router;