socket.on('StoMS-setTemperature', data => {
  //Здесь микро-сервер должен взять необходимые данные из Ардуино
  //Расчитать на сколько нужно изменить расход теплоносителя
  //И передать нужную велечину расхода контроллеру Ардуино

  //Сохранить информацию о температурах воздуха
  data.outsideTemperature = getOutsideTemperature();
  data.currentTemperature = getCurrentTemperature();
  //И передать информацию обратно серверу через событие
  socket.emit('MStoS-settedTemperature', data);
});
