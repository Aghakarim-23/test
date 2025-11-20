import express from "express";
import { createNote, getAllNotes, getSingleNote, getUserNotes } from "../controllers/noteController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();


router.post("/createNote", verifyToken, createNote)
router.get("/getUserNotes", verifyToken, getUserNotes)
router.get("/getAllNotes", verifyToken, getAllNotes)
router.get("/getSingleNote/:id", verifyToken, getSingleNote)

export default router
