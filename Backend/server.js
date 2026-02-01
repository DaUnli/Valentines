import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/valentineDB")
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

// 🔐 CHECK PIN
app.post("/api/check-pin", async (req, res) => {
  const { pin } = req.body;
  const valid = await Pin.findOne({ pin });
  valid ? res.json({ success: true }) : res.status(401).json({ success: false });
});

// 💬 SAVE MESSAGE
app.post("/api/message", async (req, res) => {
  await Message.create({ text: req.body.text });
  res.json({ success: true });
});

// ❤️ SAVE YES
app.post("/api/yes", async (req, res) => {
  await Yes.create({});
  res.json({ success: true });
});

app.listen(5000, () =>
  console.log("Server running → http://localhost:5000")
);
