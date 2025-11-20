import User from "../models/User.js";
import bcryt from "bcrypt";
import jwt from "jsonwebtoken";

// register

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const hashedPassword = await bcryt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    const user = await User.create(newUser);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        username,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User is not found" });

    const isMatched = bcryt.compare(password, user.password);

    if (!isMatched)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      message: "Login is successfull",
      user: {
        id: user.id,
        email,
        username: user.username,
      },
      accessToken,
    });
  } catch (error) {
    console.error(error);
  }
};

// getAlluser route

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users) return res.status(404).json({ message: "Users not found" });

    res.status(200).json({
      data: {
        count: users.length,
        users,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

// getSingleUser

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User is not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};

// deleteUser

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User is not found" });

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    console.error(error);
  }
};

// uodateUser

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User is not found" });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
  }
};
