const express = require("express");

const router = express.Router();

const {
    getUserProfile,
    getUserRepos,
} = require("../controllers/githubController");

router.get("/user/:username", getUserProfile);

router.get("/repos/:username", getUserRepos);

module.exports = router;