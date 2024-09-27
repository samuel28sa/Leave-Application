import express from "express";
import cors from "cors";
import userRoute from "./Routes/userRoute.js";
import dbConnect from "./Config/Db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import announcementRoute from "./Routes/announcementsRoute.js";
import leaveRoute from "./Routes/leaverequestsRoute.js";
import path from "path";
import * as url from "url";

// const announcementsRoutes = require("./Routes/announcementsRoute.js");
dotenv.config();
if (dotenv.error) {
  throw dotenv.error;
}

const app = express();
const port = 8001;
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../cyberbyte", "dist")));
app.use("*", express.static(path.join(__dirname, "../cyberbyte", "dist")));

dbConnect();

// app.use(
//   cors({
//     credentials: true,
//     origin: "localhost:5173",
//   })
// );
//
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/announcements", announcementRoute);

app.use("/user", userRoute);
app.use("/leave-requests", leaveRoute);

app.listen(port, () => console.log(`App is running on port ${port}`));
