<style lang='scss'>
.rMainLayout {
  &-menu {
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: 355px;
  }
  &-header {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 355px;
    width: calc(100% - 355px);
    height: 72px;
  }
  &-content {
    min-height: calc(100vh - 72px);
    // top: 72px;
    position: relative;
    left: 355px;
    width: calc(100% - 355px);
  }
}
</style>
<template>
  <div class="rMainLayout">
    <header class="rMainLayout-header">
      <slot name="header"></slot>
    </header>
    <aside class="rMainLayout-menu">
      <slot name="menu"></slot>
    </aside>
    <main class="rMainLayout-content">
      <slot name="content"></slot>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return { message: '' };
  },
  props: {},
  computed: {},
  methods: {},
  watch: {},
  mounted() {},
};
</script>