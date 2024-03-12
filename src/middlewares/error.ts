import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../helpers.js";

const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  sendResponse(res, 500, err.message, null, { stack: err.stack });
};

export default errorMiddleware;
