import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json()); // this middleware parse the json bodies: access to req.body

app.use(rateLimiter);

// simple custom middleware
// app.use((req, res, next) => {
//   console.log(`The request method is ${req.method} and the url is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// app.get("/api/notes", (req, res) => {
//   res.send("You got 20 notes");
// });

// app.post("api/notes", (req, res) => {
//   res.status(201).json({ message: "Note created successfully!" });
// });

// app.put("api/notes/:id", (req, res) => {
//   res.status(200).json({ message: "Note updated successfully!" });
// });

// app.delete("api/notes/:id", (req, res) => {
//   res.status(200).json({ message: "Note deleted successfully!" });
// });

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server started on port: 5001");
  });
});

// mongodb+srv://tarunruttala76:Dad4BrYiVZY0UaqG@cluster0.0uxnzw2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
