const { Schema, model, Types } = require("mongoose");

const schema = Schema({
  desiredTemperature: { type: Number },
  currentTemperature: { type: Number },
  outsideTemperature: { type: Number },
  hasInterval: { type: Boolean },
  beginHour: { type: Number },
  endHour: { type: Number },
  userId: { type: Types.ObjectId },
});

module.exports = model("Temperature", schema);
