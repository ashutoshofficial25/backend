import { Schema, Types, model } from "mongoose";

export interface IUserMock {
  user: Types.ObjectId;
  mockId: Types.ObjectId;
  remark: string;
}

const userMockSchema = new Schema<IUserMock>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  mockId: { type: Schema.Types.ObjectId, ref: "User" },
  remark: String,
});

const UserMock = model<IUserMock>("UserMock", userMockSchema);

export default UserMock;
