<style lang="scss">
.rLoginForm {
  width: 100%;
  max-width: 360px;
  border-radius: 30px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  background: $white;
  padding: 48px 24px;
  @include respond-to('sm') {
    padding: 48px 60px;
  }
  &-logo {
    display: block;
    margin: 0 auto 72px;
  }
  &-loginInput {
    width: 100%;
    margin-bottom: 24px;
  }
  &-passwordInput {
    width: 100%;
    margin-bottom: 72px;
  }
  &-btn {
    width: 100%;
    &:not(:last-of-type) {
      margin-bottom: 24px;
    }
  }
}
</style>
<template>
  <div class="rLoginForm">
    <r-logo class="rLoginForm-logo"></r-logo>
    <r-input class="rLoginForm-loginInput" v-model="userLogin" label="Логин"></r-input>
    <q-input class="rLoginForm-passwordInput" v-model="password" label="Пароль"></q-input>
    <r-btn @click="signUp" class="rLoginForm-btn" label="Зарегистрироваться"></r-btn>
    <r-btn @click="login" class="rLoginForm-btn" label="Войти"></r-btn>
  </div>
</template>
<script>
import request from '../../scripts/api';
import rInput from '../wrapped/quasar/r-input.vue';
import rBtn from '../wrapped/quasar/r-btn.vue';
import rLogo from '../common/r-logo.vue';
export default {
  components: { rInput, rLogo, rBtn },
  data() {
    return {
      password: '',
      userLogin: '',
    };
  },

  props: {},
  computed: {},
  methods: {
    signUp() {
      request.publicRequest
        .post('/api/auth/signup', {
          login: this.userLogin,
          password: this.password,
        })
        .then(res => {
          this.$q.notify({
            color: 'white',
            message: res.data.message,
          });
        })
        .catch(err => {
          this.$q.notify({
            color: 'white',
            message: err.response.data.message,
          });
        });
    },
    login() {
      request.publicRequest
        .post('/api/auth/login', {
          login: this.userLogin,
          password: this.password,
        })
        .then(res => {
          window.localStorage.setItem('token', res.data.token);
          window.location.reload();
        })
        .catch(err => {
          this.$q.notify({
            color: 'white',
            message: err.response.data.message,
          });
        });
    },
  },
};
</script>
