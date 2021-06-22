const express = require("express");
const User = require("../models/user");
const router = express.Router();



router.post("/login", async (req, res, next) => {
    try {
        // email, pw, attempt to authenticate
        const user = await User.login(req.body);
        return res.status(200).json({ user });
    } catch (e) {
        next(e);
    }
});

router.post("/register", async (req, res, next) => {
    try {
        // take info to register, email, pw, etc
        const user = await User.register(req.body);
        return res.status(201).json({ user });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
