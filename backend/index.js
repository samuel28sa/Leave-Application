const express = require("express");
const cors = require("cors");
const userRoute = require("./Routes/userRoute");
const dbConnect = require("./Config/Db");
const app = express();
const port = 5000;
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const announcementRoute = require("./Routes/announcementsRoute");
const leaveRoute = require("./Routes/leaverequestsRoute");
// const announcementsRoutes = require("./Routes/announcementsRoute.js");

if (dotenv.error) {
  throw dotenv.error;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

dbConnect();

app.use(
  cors({
    credentials: true,
    origin: "localhost:5173",
  })
);
app.use("/announcements", announcementRoute);
app.use("/user", userRoute);
app.use("/leave-requests", leaveRoute);

app.listen(port, () => console.log(`App is running on port ${port}`));
