<style lang="scss"></style>
<template>
  <div>this is weather</div>
</template>
<script>
export default {
  components: {},
  data: () => {
    return {};
  },
  computed: {
    list() {
      return this.$store.getters['temperature/listWeatherTemperature'];
    },
  },
  methods: {
    getWeatherData() {
      if (!!this.list.length) return;
      // this.$q.loading.show();
      this.$store
        .dispatch('temperature/getWeatherData')
        .then(res => {
          // this.$q.loading.hide();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    // this.getWeatherData();
  },
};
</script>
