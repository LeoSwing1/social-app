import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =======================
// ✅ SIGNUP
// =======================
export const signupUser = async (req, res) => {
  try {
    console.log("🔥 SIGNUP BODY:", req.body);

    const name = req.body.name;
    const email = req.body.email?.trim().toLowerCase(); // 🔥 SAFE
    const password = req.body.password;

    // 🔥 VALIDATION
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    // 🔍 CHECK EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 SAVE USER
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
    res.status(500).json({
      message: "Server error"
    });
  }
};


// =======================
// ✅ LOGIN
// =======================
export const loginUser = async (req, res) => {
  try {
    console.log("🔥 LOGIN HIT");
    console.log("👉 BODY:", req.body);

    const email = req.body.email?.trim().toLowerCase(); // 🔥 SAFE
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email & password required"
      });
    }

    console.log("👉 SEARCH EMAIL:", email);

    // 🔍 DEBUG: SEE ALL USERS
    const allUsers = await User.find({});
    console.log("👉 ALL USERS:", allUsers);

    // 🔍 FIND USER
    const user = await User.findOne({
      email: { $regex: `^${email}$`, $options: "i" } // 🔥 SAFE MATCH
    });

    console.log("👉 FOUND USER:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // 🔐 CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // 🎟️ TOKEN
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({
      message: "Server error"
    });
  }
};