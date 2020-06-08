const express = require("express");
const app = express();
const PORT = 4000;

const io = require("socket.io-client");
const socket = io.connect("http://localhost:3333/", {
  reconnection: true,
});

const getCurrentTemperature = () => {
  // Взять температуру воздуха в квартире из модуля Ардуино
  return 22;
};
const getOutsideTemperature = () => {
  // Взять температуру воздуха на улице из модуля Ардуино
  return 13;
};
const getRadiatorTemperature = () => {
  // Взять температуру теплоносителя из модуля Ардуино
  return 22;
};

socket.on("connect", () => {
  socket.on("StoMS-setTemperature", (data) => {
    //Здесь микро-сервер должен взять необходимые данные из Ардуино
    //Расчитать на сколько нужно изменить расход теплоносителя
    //И передать нужную велечину расхода контроллеру Ардуино

    //Сохранить информацию о температурах воздуха
    data.outsideTemperature = getOutsideTemperature();
    data.currentTemperature = getCurrentTemperature();
    //И передать информацию обратно серверу через событие
    socket.emit("MStoS-settedTemperature", data);
  });

  socket.on("StoMS-getTemperature", (data) => {
    //check Arduino
    data.outsideTemperature = getOutsideTemperature();
    data.currentTemperature = getCurrentTemperature();
    socket.emit("MStoS-gettedTemperature", data);
  });
});

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
