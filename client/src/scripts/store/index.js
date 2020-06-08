import Vue from 'vue';
import Vuex from 'vuex';
import client from './clientStore';
import temperature from './temperatureStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    client: client,
    temperature: temperature,
  },
});
