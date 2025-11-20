import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger/swaggerOptions.js";
import noteRoutes from "./routes/noteRoutes.js"
dotenv.config();

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is working")
})

connectDB()


app.use("/api/auth/", authRoutes)
app.use("/notes", noteRoutes)

app.listen(process.env.PORT, () => {
    console.log(`✅ Server is running on ${process.env.PORT}`)
})
