import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/dbConnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js"
import applicationRoutes from "./routes/application.routes.js"
import { removeUnverifiedUser } from "./automation/removeUnverifiedUser.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";

const app = express();
dotenv.config({ path: "./config/.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

removeUnverifiedUser();
newsLetterCron();
dbConnection();
app.use(errorMiddleware);

export default app;
