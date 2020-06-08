<style lang="scss">
.rMainPage {
  @include sidebar-padding;
  padding-top: 96px;
}
</style>
<template>
  <div class="rMainPage">
    <r-main-temperature></r-main-temperature>
    <r-main-temperature-graph></r-main-temperature-graph>
    <r-main-weather></r-main-weather>
  </div>
</template>
<script>
import rMainTemperature from "../general/r-main-temperature";
import rMainTemperatureGraph from "../general/r-main-temperature-graph";
import rMainWeather from "../general/r-main-weather";
export default {
  components: {
    rMainTemperature,
    rMainTemperatureGraph,
    rMainWeather
  },
  mounted() {}
};
</script>
