import express from "express";
import mongoose from "mongoose";

import key from "./db/config.js";
import authRouter from "./router/api/auth.js";
import applyPassportStrategy from "./middleware/passport.js";
import passport from "passport";
import cors from "cors";

const app = express();

// Connect to MongoDB
mongoose
  .connect(key.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to Movie DB");

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(passport.initialize());
    applyPassportStrategy(passport);

    // Routes
    app.use("/api", authRouter);

    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Can not connect to the database", err);
  });
