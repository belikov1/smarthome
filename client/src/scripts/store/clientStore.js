export default {
  namespaced: true,
  state: {
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    email: '',
    login: '',
    id: '',
  },
  getters: {
    getMi(state) {
      return state.middleName + 'work';
    },
  },
  mutations: {
    putState(state, payload) {
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.middleName = payload.middleName;
      state.email = payload.email;
      state.gender = payload.gender;
      state.login = payload.login;
      state.id = payload._id;
    },
  },
  actions: {},
};
