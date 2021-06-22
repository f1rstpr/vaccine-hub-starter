const express = require("express");
const router = express.Router();

router.post("/login", async (req, res, next) => {
    try {
        // email, pw, attempt to authenticate
    } catch (e) {
        next(e);
    }
});

router.post("/register", async (req, res, next) => {
    try {
        // take info to register, email, pw, etc
    } catch (e) {
        next(e);
    }
});

module.exports = router;
