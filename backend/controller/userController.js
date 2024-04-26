import bcrypt from "bcryptjs";
import validateLoginInput from "../validation/loginValidation.js";
import validateRegisterInput from "../validation/registerValidation.js";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import key from "../db/config.js";
import Movie from "../model/movieModel.js";
// CREATE USER
export const createUser = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({
        email: "Email already exists",
      });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              newUser.password = hash;
              const newOfUser = await newUser.save();
              res.json(newOfUser);
            }
          });
        }
      });
    }
  } catch (err) {
    throw err;
  }
};

// SIGN IN USER

export const signInUser = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (!user) {
      errors.email = "User Email or Password Incorrect";
      return res.status(404).json(errors);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        id: user.id,
        email: user.email,
      };
      jwt.sign(
        payload,
        key.JWT_SECRET,
        {
          expiresIn: key.expiresIn,
        },
        (err, token) => {
          if (err) console.error("There is some error in token", err);
          else {
            res.json({
              success: true,
              type: "Bearer",
              token: token,
            });
          }
        }
      );
    } else {
      errors.password = "User Email or Password Incorrect";
      return res.status(404).json(errors);
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const getUser = (req, res) => {
  User.find({}, (err, result) => {
    res.status(200).json({
      data: result,
    });
  });
};
