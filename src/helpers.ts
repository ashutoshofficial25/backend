import { Response } from "express";

export const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any | null = null,
  errors: any = null
) => {
  return res.status(statusCode).json({
    status: statusCode,
    message: message || "success",
    data,
    errors,
  });
};
