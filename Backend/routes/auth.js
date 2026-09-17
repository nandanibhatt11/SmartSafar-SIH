import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// SIGN UP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
// GET SAVED PLACES
router.get("/saved-places", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("savedPlaces");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      savedPlaces: user.savedPlaces || [],
    });
  } catch (error) {
    console.error("Get saved places error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// SAVE A PLACE
router.post("/saved-places", authMiddleware, async (req, res) => {
  try {
    const {
      locationId,
      name,
      city,
      category,
      image,
    } = req.body;

    if (!locationId || !name || !city) {
      return res.status(400).json({
        message: "locationId, name and city are required",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const alreadySaved = user.savedPlaces.some(
      (place) => place.locationId === String(locationId)
    );

    if (alreadySaved) {
      return res.status(400).json({
        message: "Place already saved",
      });
    }

    user.savedPlaces.push({
      locationId: String(locationId),
      name,
      city,
      category: category || "",
      image: image || "",
    });

    await user.save();

    res.status(201).json({
      message: "Place saved successfully",
      savedPlaces: user.savedPlaces,
    });
  } catch (error) {
    console.error("Save place error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// REMOVE A SAVED PLACE
router.delete(
  "/saved-places/:locationId",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      user.savedPlaces = user.savedPlaces.filter(
        (place) =>
          place.locationId !== String(req.params.locationId)
      );

      await user.save();

      res.json({
        message: "Place removed successfully",
        savedPlaces: user.savedPlaces,
      });
    } catch (error) {
      console.error("Remove saved place error:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);


export default router;