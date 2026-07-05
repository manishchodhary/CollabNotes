import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists)
      return res
        .status(400)
        .json({ message: "Username and email already taken" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashedPassword });
    
    
    res.status(201).json({ user, message: "Account created! Please login." });
  } catch (error) {
    console.log("error in register route");

    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ message: "Invalid credentails" });
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    
    res
      .status(200)
      .json({ user: user, message: "Login successful!", token: token });
  } catch (error) {
    console.log("error in login route", error);

    res.status(500).json({ message: "Server error" });
  }

});

export default router;
