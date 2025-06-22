import "dotenv/config";
import express from "express";
import connectToDatabase from "./config/db";
import cors from "cors";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import authenticate from "./middleware/authenticate";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/health", (req, res) : any => {
  return res.status(OK).json({
    status: "good health",
  });
});

// auth routes
app.use("/auth", authRoutes)

// protected routes
app.use('/user', authenticate, userRoutes)

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} environment.`);
  await connectToDatabase();
});
