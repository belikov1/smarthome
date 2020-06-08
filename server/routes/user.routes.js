const express = require("express");
const { Router } = express;
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.get("/info", auth, (req, res) => {
  User.findById(req.user.userId).then((user) => res.status(200).json({ user }));
});

router.put("/update", auth, (req, res) => {
  User.findByIdAndUpdate(req.user.userId, req.body, {
    new: true,
    useFindAndModify: false,
  }).then((user) => res.status(200).json(user));
});

module.exports = router;
