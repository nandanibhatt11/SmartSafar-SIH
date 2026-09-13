import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    city: { type: String, required: true, index: true },
    state: { type: String, default: "Uttarakhand" },
    name: { type: String, required: true, index: true },
    type: { type: String, enum: ["famous", "alternative"], required: true, index: true },
    category: { type: String, required: true, index: true },
    density: { type: Number, required: true, min: 0, max: 100 },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    alternatives: { type: [String], default: [] }
  },
  { timestamps: true }
);

locationSchema.index({ city: 1, category: 1, type: 1, price: 1 });

export default mongoose.model("Location", locationSchema);
