import express, { Router } from "express";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// @access Public

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //Registration logic to register the user
    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        message: "User already exists",
      });

    user = new User({ name, email, password });
    await user.save();

    // log for testing
    // res.status(201).json({
    //     user: {
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email,
    //         role: user.role
    //     }
    // })
    //

    // Creating JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    //sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) {
          throw err;
        }

        // send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.send(500).send("Server Error");
  }
});

// @route POST /api/users/login
// @desc Authenticate user
// @access Public

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user by email
    let user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "Invalid Credential",
      });

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(400).json({
        message: "Invalid Credential",
      });

    // crate jwt payload
    const payload = { user: { id: user._id, role: user.role } };

    //sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) {
          throw err;
        }

        // send the user and token in response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
});

// @rooute GET /api/users/profile
// @desc get the logged in users profile (protedted route)
// @access Private

router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

export default router;
