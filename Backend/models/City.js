import mongoose from "mongoose";

const staySchema = new mongoose.Schema({
  id: String, name: String, kind: String, price: Number, density: Number, alternative: String
}, { _id: false });

const foodSchema = new mongoose.Schema({
  id: String, name: String, kind: String, price: Number, density: Number, alternative: String
}, { _id: false });

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    state: { type: String, default: "Uttarakhand" },
    liveDensity: { type: Number, required: true, min: 0, max: 100 },
    densityNote: { type: String, required: true },
    transit: { type: String, required: true },
    weather: { type: String, required: true },
    quietWindow: { type: String, required: true },
    experience: { type: String, required: true },
    center: { type: [Number], required: true },
    stays: { type: [staySchema], default: [] },
    food: { type: [foodSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("City", citySchema);
