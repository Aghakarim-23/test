import express from "express";
import {
  register,
  getAllUser,
  getSingleUser,
  login,
  deleteUser,
  updateUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/getAllUser", verifyToken, getAllUser);

router.get("/getSingleUser/:id", getSingleUser);

router.delete("/deleteUser/:id", deleteUser);

router.put("/updateUser/:id", updateUser);

export default router;
