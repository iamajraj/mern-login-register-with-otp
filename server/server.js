require("dotenv").config();
const express = require("express");
const http = require("http");
const dbConnect = require("./db/db");
const authRoute = require("./routes/auth");
const morgan = require("morgan");
const cors = require("cors");

const __PROD__ = process.env.NODE_ENV === "production";

// helper function to delete all users at once
// const deleteAllUsers = require("./db/deleteAllUsers");

const app = express();
app.use(
    cors({
        // change the origin according to your website url
        origin: "*",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(__PROD__ ? "common" : "dev"));

app.use("/api/auth", authRoute);

// helper function to delete all users at once
// deleteAllUsers().then().catch();

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
    console.log("Server is started on port 5000 🚀");
    await dbConnect();
});
