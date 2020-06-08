import Vue from 'vue';
import App from './App.vue';
import './quasar';
import './styles/index.scss';
import router from './scripts/router';
import store from './scripts/store';

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: h => h(App),
});

window.sm = app;
app.$mount('#app');
