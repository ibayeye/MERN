import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js"
import orderRouter from "./routes/orderRouter.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";

dotenv.config();
const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./public'))

// endpoint
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);

// middleware error handling
app.use(notFound);
app.use(errorHandler);

// server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// connection
mongoose.connect(process.env.DATABASE, {}).then(() => {
  console.log("Database connected");
});
