import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
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

      res.status(201).json({
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

export const login = async (req: Request, res: Response) => {
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

      //   const existsInDB = DB.find((person) => person?.email === profile?.email);

      const isExist = false;

      if (!isExist) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
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
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    return { payload: ticket.getPayload() };
  } catch (error) {
    return { erorr: "Invalid User" };
  }
}
