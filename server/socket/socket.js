const io = require("socket.io").listen(3333);
const Temperature = require("../models/temperature");

//StoMS => server to microserver
//StoC => server to client
//MStoS => microserver to server
//CtoS => client to server
const saveTemperature = (req) => {
  const userId = req.userId;
  Temperature.findOneAndUpdate({ userId }, req.data, {
    new: true,
    useFindAndModify: false,
  }).then((tempInfo) => {
    io.emit("StoMS-setTemperature", tempInfo);
  });
};

io.on("connection", (socket) => {
  socket.on("CtoS-setTemperature", (req) => {
    saveTemperature(req);
  });

  socket.on("MStoS-settedTemperature", (tempInfo) => {
    console.log(tempInfo);
    io.emit("StoC-settedTemperature", tempInfo);
  });

  socket.on("CtoS-getTemperature", (userId) => {
    Temperature.findOne({ userId }).then((tempInfo) => {
      io.emit("StoMS-getTemperature", tempInfo);
    });
  });

  socket.on("MStoS-gettedTemperature", (data) => {
    Temperature.findOneAndUpdate({ userId: data.userId }, data, {
      new: true,
      useFindAndModify: false,
    }).then((tempInfo) => {
      io.emit("StoC-gettedTemperature", tempInfo);
    });
  });
});
