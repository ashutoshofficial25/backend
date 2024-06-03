import { Request, Response } from 'express';
import Message from '../models/message.model.js';
import { sendResponse } from '../helpers.js';

export const sendMessage = async (req: Request, res: Response) => {
  const { userId, contactId, message } = req.body;

  const newMessage = await Message.create({
    from: req.user._id,
    to: userId,
    contactId,
    message,
  });

  sendResponse(res, 201, 'Success', newMessage);
};
