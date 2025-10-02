import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      userId: mongoose.Types.ObjectId;
      role: string;
      sessionId: mongoose.Types.ObjectId;
    }
  }
}
export {};
