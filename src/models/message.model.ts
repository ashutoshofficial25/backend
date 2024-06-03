import { Schema, model } from 'mongoose';

export interface IMessage {
  from: Schema.Types.ObjectId;
  to: Schema.Types.ObjectId;
  contactId: Schema.Types.ObjectId;
  message?: string;
  media?: string;
  isSeen: boolean;
}

const MessageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  contactId: { type: Schema.Types.ObjectId, ref: 'Contact' },
  message: { type: String },
  media: { type: String },
  isSeen: { type: Boolean, default: false },
});

const Message = model<IMessage>('Message', MessageSchema);

export default Message;
