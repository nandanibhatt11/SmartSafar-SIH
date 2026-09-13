import express from "express";
import City from "../models/City.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const cities = await City.find({}).sort({ name: 1 }).lean();
    res.json({ success: true, count: cities.length, data: cities });
  } catch (error) {
    next(error);
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const city = await City.findOne({
      name: new RegExp(`^${escapeRegex(req.params.name)}$`, "i")
    }).lean();

    if (!city) {
      return res.status(404).json({ success: false, message: "City not found" });
    }

    res.json({ success: true, data: city });
  } catch (error) {
    next(error);
  }
});

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default router;
