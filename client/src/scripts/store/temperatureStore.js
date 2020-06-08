import Axios from 'axios';
import socket from '../../scripts/socket';

socket.on('connect', () => {
  console.log(socket.id);
});

socket.on('StoC-settedTemperature', tempInfo => {
  const temperatureMessage =
    'Желаемая температура установлена. Температура воздуха будет стремится к ' +
    tempInfo.desiredTemperature +
    '°С';
  const intervalMessage =
    'Выбранный интервал для понижения температуры установлен.';
  sm.$store.commit('temperature/setTemperature', tempInfo);
  sm.$q.notify({
    color: 'white',
    message: tempInfo.hasInterval ? intervalMessage : temperatureMessage,
  });
});

socket.on('StoC-gettedTemperature', tempInfo => {
  sm.$store.commit('temperature/setTemperature', tempInfo);
  sm.$q.loading.hide();
});

export default {
  namespaced: true,
  state: {
    weatherData: {},
    currentTemperature: 0,
    desiredTemperature: 0,
    outsideTemperature: 0,
    beginHour: 0,
    endHour: 0,
    hasInterval: false,
  },
  getters: {
    listWeatherTemperature(state) {
      const { weatherData } = state;
      return weatherData && weatherData.data && weatherData.data.list
        ? weatherData.data.list
        : [];
    },
  },
  mutations: {
    setWeatherData(state, data) {
      state.weatherData = data;
    },
    setTemperature(state, data) {
      state.currentTemperature = data.currentTemperature;
      state.desiredTemperature = data.desiredTemperature;
      state.outsideTemperature = data.outsideTemperature;
      state.beginHour = data.beginHour;
      state.endHour = data.endHour;
      state.hasInterval = data.hasInterval;
    },
  },
  actions: {
    getWeatherData(context) {
      return Axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=9e0d388ce96d26f86761dc4706f6a657`,
      ).then(res => {
        context.commit('setWeatherData', res);
        return res;
      });
    },

    sendTemperature(context, payload) {
      socket.emit('CtoS-setTemperature', payload);
    },

    getTemperature(context, userId) {
      socket.emit('CtoS-getTemperature', userId);
    },
  },
};
