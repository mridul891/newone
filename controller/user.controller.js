import { uniqueid } from "../model/uniqueId.js";
import { user } from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Envs
const saltRound = 10;
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0//", salt);
const SECRET = "Secret";

export const singupController = async (req, res) => {
  try {
    const body = req.body;

    const exisitingUser = await user.findOne({
      username: body.username,
    });
    if (exisitingUser) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }

    const validUser = await uniqueid.findOne({
      uniqueId: body.uniqueId,
    });

    if (!validUser) {
      return res.status(400).json({ message: "Not a Valid Member of NDRF" });
    }
    const hashedPassword = bcrypt.hashSync(body.password, saltRound);

    const newUser = await user.create({
      username: body.username,
      password: hashedPassword,
      uniqueId: body.uniqueId,
    });

    const token = jwt.sign(
      {
        username: newUser.username,
        id: newUser._id,
      },
      SECRET
    );
    console.log(token);

    res.status(200).json({
      message: " user Created successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while Creating the User" });
  }
};

export const signinController = async (req, res) => {
  try {
    const body = req.body;

    const userPresent = await user.findOne({
      username: body.username,
    });

    if (!userPresent) {
      return res
        .status(400)
        .json({ message: " User is not Present please Register " });
    }

    await bcrypt.compare(
      body.password,
      userPresent.password,
      (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign(
            { username: userPresent.username, id: userPresent._id },
            SECRET
          );

          return res.status(200).json({
            token: token,
          });
        } else {
          return res.status(400).json({
            message: "Password Incorrect",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " Error while Sign in" });
  }
};

export const uniqueidController = async (req, res) => {
  try {
    const body = req.body;

    const exisitingId = await uniqueid.findOne({
      uniqueId: body.uniqueid,
    });

    if (exisitingId) {
      return res.status(400).json({
        message: "Already A valid user",
      });
    }

    await uniqueid.create({
      uniqueId: body.uniqueid,
      name: body.name,
    });

    res.json({
      id: body.uniqueid,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while creating a Unique Id",
    });
  }
};
