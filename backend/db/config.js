import { response } from "express";
import passport from "passport";

const mongoUri = {
  MONGO_URI:
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000",
  JWT_SECRET: "MYSECRET",
  expiresIn: 10000,
  authJwt: passport.authenticate("jwt", { session: false }),
};

export default mongoUri;
