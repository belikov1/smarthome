<style lang="scss"></style>
<template>
  <r-main-layout>
    <template slot="menu">
      <r-main-menu></r-main-menu>
    </template>
    <template slot="content">
      <router-view v-if="!$q.loading.isActive"></router-view>
    </template>
    <template slot="header">
      <r-main-header></r-main-header>
    </template>
  </r-main-layout>
</template>
<script>
import { authRequest } from '../../scripts/api';
import rMainHeader from './r-main-header';
import rMainMenu from './r-main-menu';
import rMainLayout from './r-main-layout';
export default {
  components: { rMainLayout, rMainHeader, rMainMenu },
  created() {
    const token = localStorage.getItem('token');
    if (!token) return this.$router.push({ name: 'auth-page' });
    //todo move to action
    this.$q.loading.show();
    authRequest
      .get('/api/user/info')
      .then(res => {
        this.$store.commit('client/putState', res.data.user);
        this.$store.dispatch('temperature/getTemperature', res.data.user._id);
      })
      .catch(err => {
        this.$q.loading.hide();
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          return this.$router.push({ name: 'auth-page' });
        }
        console.error(err.response.data.message || 'error in general page');
      });
  },
};
</script>
