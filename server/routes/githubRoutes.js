const express = require("express");

const router = express.Router();

const {
    getUserProfile,
    getUserRepos,
    compareUsers,
    getSearchHistory
} = require("../controllers/githubController");

router.get("/user/:username", getUserProfile);

router.get("/repos/:username", getUserRepos);
router.get("/compare/:user1/:user2", compareUsers);
router.get("/history", getSearchHistory);

module.exports = router;