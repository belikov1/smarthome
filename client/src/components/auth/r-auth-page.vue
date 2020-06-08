<style lang="scss">
.rAuthPage {
  background-image: url('../../img/auth-background.jpg');
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-size: cover;
  background-position: center center;
  &-loginForm {
    margin: 100px auto 0;
  }
}
</style>
<template>
  <div class="rAuthPage">
    <r-login-form class="rAuthPage-loginForm"></r-login-form>
  </div>
</template>
<script>
import rLoginForm from './r-login-form';
export default {
  components: { rLoginForm },
  methods: {
    init() {
      //TODO wrap try/catch
      const token = localStorage.getItem('token');
      if (!!token) this.$router.push({ name: 'main-page' });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
