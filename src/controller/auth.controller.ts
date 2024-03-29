import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verifyGoogleToken } from "../services/google.auth.js";
import User from "../models/user.model.js";
import { sendResponse } from "../helpers.js";

import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  const { name, email, query, password } = req.body;

  const isExist = await User.findOne({ email });

  if (isExist) {
    return sendResponse(res, 401, "User already exist");
  }

  const salt = await bcrypt.genSalt(12);

  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    query,
    password: hashPassword,
  });

  sendResponse(res, 201, "Success", user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const isExist = await User.findOne({ email });

  if (!isExist) {
    return sendResponse(res, 404, "Not exist");
  }

  const checkPassword = await bcrypt.compare(password, isExist.password!);

  if (!checkPassword) {
    return sendResponse(res, 400, "Password Incorrect!");
  }

  sendResponse(res, 200, "Success", isExist);
};

export const GRegister = async (req: Request, res: Response) => {
  const cred = req.body.credential;

  try {
    if (cred) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.erorr) {
        return res.status(400).json({
          message: verificationResponse.erorr,
        });
      }

      const profile = verificationResponse?.payload;

      // Store payload in DB users.create(profile)

      console.log("log: profile", profile);

      return res.status(201).json({
        message: "Signup was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, "myScret", {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
};

export const GLogin = async (req: Request, res: Response) => {
  const cred = req.body.credential;

  if (!cred) {
    sendResponse(res, 404, "Credentials required");
  }

  const verificationResponse = await verifyGoogleToken(req.body.credential);
  if (verificationResponse.erorr) {
    return res.status(400).json({
      message: verificationResponse.erorr,
    });
  }

  const profile = verificationResponse?.payload;

  const isExist = await User.find({ email: profile?.email });

  if (!isExist) {
    sendResponse(res, 404, "You are not registered");
  }

  res.status(201).json({
    message: "Login was successful",
    user: {
      firstName: profile?.given_name,
      lastName: profile?.family_name,
      picture: profile?.picture,
      email: profile?.email,
      token: jwt.sign({ email: profile?.email }, "secret", {
        expiresIn: "1d",
      }),
    },
  });
};
