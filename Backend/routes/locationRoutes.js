import express from "express";
import Location from "../models/Location.js";

const router = express.Router();

// GET /api/locations
// Query params: city, search, category, type, maxPrice, minDensity, maxDensity
router.get("/", async (req, res, next) => {
  try {
    const { city, search, category, type, maxPrice, minDensity, maxDensity } = req.query;
    const filter = {};

    if (city) filter.city = new RegExp(`^${escapeRegex(city)}$`, "i");
    if (category && category !== "All") filter.category = category;
    if (type && type !== "All") filter.type = type;

    if (search) {
      const safe = escapeRegex(search);
      filter.$or = [
        { name: { $regex: safe, $options: "i" } },
        { description: { $regex: safe, $options: "i" } },
        { category: { $regex: safe, $options: "i" } }
      ];
    }

    if (maxPrice !== undefined && maxPrice !== "") {
      const value = Number(maxPrice);
      if (!Number.isNaN(value)) filter.price = { ...(filter.price || {}), $lte: value };
    }
    if (minDensity !== undefined && minDensity !== "") {
      const value = Number(minDensity);
      if (!Number.isNaN(value)) filter.density = { ...(filter.density || {}), $gte: value };
    }
    if (maxDensity !== undefined && maxDensity !== "") {
      const value = Number(maxDensity);
      if (!Number.isNaN(value)) filter.density = { ...(filter.density || {}), $lte: value };
    }

    const locations = await Location.find(filter).sort({ type: 1, name: 1 }).lean();

    res.json({
      success: true,
      count: locations.length,
      data: locations
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/locations/:id
router.get("/:id", async (req, res, next) => {
  try {
    const location = await Location.findOne({ id: req.params.id }).lean();

    if (!location) {
      return res.status(404).json({ success: false, message: "Location not found" });
    }

    res.json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
});

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default router;
