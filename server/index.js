require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios=require("axios")

const githubRoutes = require("./routes/githubRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("GitHub Profile Analyzer API Running");
});

app.use("/api", githubRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});