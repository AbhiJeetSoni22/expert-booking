import Booking from "../models/Booking.js";
import Expert from "../models/Expert.js";

// POST /bookings
export const createBooking = async (req, res) => {
  try {
    const { expertId, name, email, phone, date, time, notes } = req.body;

    if (!expertId || !name || !email || !phone || !date || !time) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const expert = await Expert.findById(expertId);
    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    // 🔥 Create Booking (unique index will prevent duplicates)
    const booking = await Booking.create({
      expert: expertId,
      name,
      email,
      phone,
      date,
      time,
      notes,
    });

    // 🔥 Update Slot in Expert Model
    await Expert.updateOne(
      {
        _id: expertId,
        "slots.date": date,
        "slots.time": time,
      },
      {
        $set: { "slots.$.isBooked": true },
      },
    );

    const io = req.app.get("io");

    io.emit("slotBooked", {
      expertId,
      date,
      time,
    });

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This time slot is already booked",
      });
    }

    res.status(500).json({ message: error.message });
  }
};

// GET /bookings?email=
export const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    const bookings = await Booking.find({ email }).populate(
      "expert",
      "name category",
    );

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /bookings/:id/status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
