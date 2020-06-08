import Vue from 'vue';
import './styles/quasar.styl';
import '@quasar/extras/material-icons/material-icons.css';
import {
  Quasar,
  QBtn,
  QInput,
  Loading,
  QSpinnerGears,
  QSelect,
  Notify,
  QDate,
} from 'quasar';

Vue.use(Quasar, {
  config: {
    loading: {
      delay: 400,
      spinner: QSpinnerGears,
      spinnerSize: 144,
      spinnerColor: 'secondary',
    },
  },
  components: {
    QBtn,
    QInput,
    QSelect,
    QDate,
    Loading,
    Notify,
  },
  directives: {},
  plugins: {
    Loading,
    Notify,
  },
});
