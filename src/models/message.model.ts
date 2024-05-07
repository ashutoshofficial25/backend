import { Schema, model } from 'mongoose';

interface IMessage {
  from: Schema.Types.ObjectId;
  to: Schema.Types.ObjectId;
  message?: string;
  media?: string;
}

const MessageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  message: { type: String },
  media: { type: String },
});

const Message = model<IMessage>('Message', MessageSchema);

export default Message;
