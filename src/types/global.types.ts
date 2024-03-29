import { Types } from "mongoose";
import { IUser } from "../models/user.model.js";

declare global {
  namespace Express {
    interface Request {
      user: WithId<IUser>;
    }
  }
}
export type WithId<T> = T & { _id: Types.ObjectId };

export default {};
