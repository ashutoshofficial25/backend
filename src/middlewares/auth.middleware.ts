import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../helpers.js';
import jwt, { Secret } from 'jsonwebtoken';
import User, { IUser } from '../models/user.model.js';
import { WithId } from '../types/global.types.js';
import { Document } from 'mongoose';

interface DecodedToken {
  _id: string;
}

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return sendResponse(res, 401, 'Authorization is required');
  }

  const token = authHeader.split(' ')[1];

  const [err, payload] = verifyToken(token, 'MY_SECRET');

  if (err) {
    const errMessage =
      err.name === 'TokenExpiredError'
        ? 'Access token expired'
        : 'Invalid access token';

    sendResponse(res, 401, errMessage);
    return;
  }

  const user = await User.findOne({ _id: payload?._id }).lean();

  if (!user) {
    sendResponse(res, 404, 'User not found');
  }

  req.user = user!;

  next();
};

export const verifyToken = (
  token: string,
  secret: Secret
): [Error | null, DecodedToken | null] => {
  try {
    const decoded = jwt.verify(token, secret) as DecodedToken;
    return [null, decoded];
  } catch (err) {
    return [err as Error, null];
  }
};
