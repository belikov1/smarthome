<style lang='scss'>
.rMainHeader {
  position: fixed;
  top: 0;
  left: 355px;
  width: calc(100% - 355px);
  @include sidebar-padding;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &-icon {
    display: block;
    margin-left: 24px;
  }
}
</style>
<template>
  <div class="rMainHeader">
    <!-- <r-icon class="rMainHeader-icon" @click.native="getHelp" pointer name="Help"></r-icon> -->
    <r-icon class="rMainHeader-icon" @click.native="logout" pointer name="exit"></r-icon>
  </div>
</template>
<script>
import rIcon from '../common/r-icon';
export default {
  components: { rIcon },
  methods: {
    // getHelp() {
    //   console.log('gethelp');
    // },
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'auth-page' });
    },
  },
};
</script>