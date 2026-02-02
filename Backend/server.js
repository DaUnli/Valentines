import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ❤️"))
  .catch((err) => console.error(err));

// 📦 Schemas
const PinSchema = new mongoose.Schema({ pin: String });
const MessageSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
});
const YesSchema = new mongoose.Schema({
  clickedAt: { type: Date, default: Date.now },
});

// 📦 Models
const Pin = mongoose.model("Pin", PinSchema);
const Message = mongoose.model("Message", MessageSchema);
const Yes = mongoose.model("Yes", YesSchema);

// 🏠 Routes
app.get("/", (req, res) => {
  res.send("💖 Valentine Backend is working!");
});

// 🔐 CHECK PIN
app.post("/api/check-pin", async (req, res) => {
  const { pin } = req.body;
  const valid = await Pin.findOne({ pin });
  valid ? res.json({ success: true }) : res.status(401).json({ success: false });
});

// 💬 SAVE MESSAGE
app.post("/api/message", async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === "") return res.status(400).json({ success: false });
  await Message.create({ text });
  res.json({ success: true });
});

// ❤️ SAVE YES
app.post("/api/yes", async (req, res) => {
  await Yes.create({});
  res.json({ success: true });
});

// 📩 ADMIN ROUTES
app.get("/api/messages", async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

app.get("/api/yes-count", async (req, res) => {
  const count = await Yes.countDocuments();
  res.json({ count });
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running → http://localhost:${PORT}`));
