import mongoose from "mongoose";

const savedPlaceSchema = new mongoose.Schema(
  {
    locationId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    savedPlaces: {
      type: [savedPlaceSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;