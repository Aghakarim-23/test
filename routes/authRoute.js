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



/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */

router.post("/register", register);

router.post("/login", login);

router.get("/getAllUser", verifyToken, getAllUser);

router.get("/getSingleUser/:id", getSingleUser);

router.delete("/deleteUser/:id", deleteUser);

router.put("/updateUser/:id", updateUser);

export default router;
