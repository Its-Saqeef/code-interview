import 'dotenv/config';
import express from 'express';
import http from 'http';
import connectDB from './db/connection.ts';
import userRouter from './routes/user.route.ts';
import authRouter from './routes/auth.route.ts';
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/error.middleware.ts";
import adminRouter from './routes/admin.route.ts';
import problemsRouter from './routes/problems.route.ts';

const app = express();
const httpServer = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        credentials: true
    }
));


// Connect to Database
connectDB().catch((err) => {
    console.error('Failed to connect to database on startup:', err);
    process.exit(1);
});


//Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/problems", problemsRouter);

// Global Error Handling Middleware
app.use(globalErrorHandler);

httpServer.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 4000}`);
});