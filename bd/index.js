const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const morgan = require("morgan")
const dbConnect = require("./Config/db")
const userRoute = require("./Routes/userRoutes")
const dashboardRoute = require("./Routes/dashboardRoute")
const leaveRoute = require("./Routes/leaveRoutes")

if (dotenv.error) {
    throw dotenv.error;
}

const app = express()
const port = 8008;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

dbConnect()

app.use(cors({ origin: "http://localhost:5173" }));
app.use("/user", userRoute)
app.use("/dashboard", dashboardRoute)
app.use("/leave", leaveRoute)

app.listen(port, () => console.log(`App is running on port ${port}`));