const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = Router();
const User = require("../models/user");
const Temperature = require("../models/temperature");

router.post("/signup", async (req, res) => {
  try {
    const { login, password } = req.body;
    const hasUserWithSameLogin = await User.findOne({ login });
    if (hasUserWithSameLogin) {
      console.log(hasUserWithSameLogin);
      return res
        .status(400)
        .json({ message: "Пользователь с таким login уже зарегистрирован" });
    }
    const hashedPassword = bcrypt.hashSync(password, 12);
    const user = new User({
      login,
      password: hashedPassword,
      lastName: "",
      middleName: "",
      firstName: "",
      gender: "",
      email: "",
    });
    await user.save();
    const temperature = new Temperature({
      desiredTemperature: 21,
      currentTemperature: 0,
      outsideTemperature: 0,
      hasInterval: false,
      beginHour: 0,
      endHour: 0,
      userId: user._id,
    });
    temperature.save();
    return res
      .status(200)
      .json({ message: "Пользователь успешно зарегистрирован" });
  } catch (e) {
    console.log("register error", e);
    return res.status(500).json({ message: "Серверная ошибка регистрации" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(400).json({ message: "Логин указан не верно" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Указан не верный пароль" });
    }
    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });
    res.status(200).json({ token, userId: user.id });
  } catch (e) {
    console.log("register error", e);
    res.status(500).json({ message: "Серверная ошибка авторизации" });
  }
});

module.exports = router;
