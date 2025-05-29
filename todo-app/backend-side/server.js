import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://dulcet-lollipop-8e7ca0.netlify.app/'
}));
app.use(express.json());

app.use("/api/users", authRoutes);
app.use('/api/todos', todoRoutes)

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
