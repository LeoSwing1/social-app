import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =======================
// ✅ SIGNUP
// =======================
export const signupUser = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created",
      user
    });

  } catch (err) {
    console.log("SIGNUP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// ✅ LOGIN
// =======================
export const loginUser = async (req, res) => {
  try {
    console.log("🔥 LOGIN HIT");

    console.log("👉 BODY:", req.body);

    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;

    console.log("👉 SEARCH EMAIL:", email);

    // 🔥 CHECK ALL USERS
    const allUsers = await User.find({});
    console.log("👉 ALL USERS:", allUsers);

    // 🔥 MAIN QUERY
    const user = await User.findOne({ email });

    console.log("👉 FOUND USER:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    res.json({ token, user });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};