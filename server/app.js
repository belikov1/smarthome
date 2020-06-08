const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const temperatureRoutes = require("./routes/temperature.routes");
require("./socket/socket");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/temperature", temperatureRoutes);

const PORT = config.get("port") || 3000;
const MONGO_URI = config.get("mongoUri");

async function start() {
  console.log("start");
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
start();
