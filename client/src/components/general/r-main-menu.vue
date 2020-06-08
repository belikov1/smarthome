<style lang='scss'>
.rMainMenu {
  background: #ecf6ff;
  min-height: 100vh;
  @include sidebar-padding;
  padding-top: 48px;
  &-logo {
    display: block;
    margin: 0 auto 24px;
  }
  // &-avatar {
  //   margin: 0 auto 24px;
  //   border-radius: 50%;
  //   background-image: url("../../img/avatar-example.jpg");
  //   background-size: cover;
  //   height: 72px;
  //   width: 72px;
  // }
  &-name {
    text-align: center;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 48px;
  }
  &-links {
    margin-top: 48px;
  }
  &-linkItem {
    margin-top: 24px;
    &:first-of-type {
      margin-top: 0;
    }
  }
}
</style>
<template>
  <div class="rMainMenu">
    <router-link class="rMainMenu-logo" :to="{name:'main-page'}">
      <r-logo class="rMainMenu-logo"></r-logo>
    </router-link>
    <!-- TODO realize photo and FIO -->
    <!-- <div class="rMainMenu-avatar"></div> -->
    <!-- <div class="rMainMenu-name">Андрей Петров</div>   -->
    <div class="rMainMenu-links">
      <r-menu-link
        class="rMainMenu-linkItem"
        :to="{name: 'profile'}"
        iconName="user"
        label="Мой профиль"
      ></r-menu-link>
      <r-menu-link
        class="rMainMenu-linkItem"
        :to="{name: 'setting'}"
        iconName="Functions"
        label="Управление температурой"
      ></r-menu-link>
      <r-menu-link
        class="rMainMenu-linkItem"
        :to="{name: 'economy'}"
        iconName="Economy"
        label="Экономия"
      ></r-menu-link>
    </div>
  </div>
</template>
<script>
import rLogo from "../common/r-logo";
import rMenuLink from "../common/r-menu-link";
export default {
  components: { rLogo, rMenuLink },
  data() {
    return { message: "" };
  },
  props: {},
  computed: {},
  methods: {},
  watch: {},
  mounted() {}
};
</script>