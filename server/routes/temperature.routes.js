const express = require("express");
const { Router } = express;
const router = Router();
const Temperature = require("../models/temperature");
const auth = require("../middleware/auth.middleware");
const socket = require("../socket/socket");

router.get("/info", auth, (req, res) => {
  const userId = req.user.userId;
  Temperature.findOne({ userId }).then((tempInfo) => {
    return res.status(200).json(tempInfo);
  });
});

// router.put("/setTemperature", auth, (req, res) => {
//   const userId = req.user.userId;
//   Temperature.findOneAndUpdate({ userId }, req.body, {
//     new: true,
//     useFindAndModify: false,
//   }).then((tempInfo) => res.status(200).json(tempInfo));
// });

module.exports = router;
