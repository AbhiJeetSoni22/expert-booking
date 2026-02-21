import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: {
    type: String, // "2026-02-22"
    required: true,
  },
  time: {
    type: String, // "10:00 AM"
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 4,
    },
    slots: [slotSchema], // Embedded slots
  },
  { timestamps: true }
);

export default mongoose.model("Expert", expertSchema);