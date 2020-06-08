<style lang='scss'>
.rTemperatureSettingPage {
  padding-top: 48px;
  padding-bottom: 48px;
  @include sidebar-padding;
  @include respond-to('md') {
    padding-top: 72px;
  }
  &-header {
    @include h1;
    margin-bottom: 72px;
  }
  &-subHeader {
    @include p1;
  }
  &-infoBlock {
    max-width: 432px;
    @include p1;
    margin-bottom: 24px;
    margin-top: 24px;
  }
  &-btn {
    display: block;
    margin-bottom: 24px;
    max-width: 432px;
    width: 100%;
    &.mSmall {
      width: 100px;
    }
    &.mTopMargin {
      margin-top: 48px;
    }
  }
  &-select {
    display: block;
    margin-bottom: 48px;
    width: 100%;
    max-width: 432px;
    &.mSmall {
      width: 100px;
      display: inline-block;
      margin-bottom: 0;
      margin-right: 24px;
    }
  }
}
</style>
<template>
  <div class="rTemperatureSettingPage">
    <div class="rTemperatureSettingPage-header">Управление темепературой</div>
    <div class="rTemperatureSettingPage-subHeader">Температура в квартире: {{currentTemperature}}°С</div>
    <div class="rTemperatureSettingPage-subHeader">Температура на улице: {{outsideTemperature}}°С</div>
    <div class="rTemperatureSettingPage-subHeader">Желаемая температура: {{desiredTemperature}}°С</div>
    <div
      class="rTemperatureSettingPage-subHeader"
      v-if="hasInterval"
    >{{`C ${beginHour.label} по ${endHour.label} температура будет понижена до 12°С`}}</div>
    <div class="rTemperatureSettingPage-infoBlock">{{infoDescription}}</div>
    <template v-if="state === states.default">
      <q-btn
        @click="state = states.setTemperature"
        class="rTemperatureSettingPage-btn"
        label="Задать температуру"
      ></q-btn>
      <q-btn
        @click="state = states.setInterval"
        class="rTemperatureSettingPage-btn"
        label="Задать интервал"
      ></q-btn>
    </template>
    <template v-else-if="state === states.setTemperature">
      <q-btn
        class="rTemperatureSettingPage-btn mSmall"
        @click="state = states.default"
        label="Назад"
      ></q-btn>
      <q-select
        class="rTemperatureSettingPage-select"
        dropdown-icon="▼"
        v-model="choosedTemperature"
        :options="temperatureOptions"
        label="Выбирете температуру"
      />
      <q-btn
        @click="saveTemperature"
        class="rTemperatureSettingPage-btn"
        label="Сохранить температуру"
      ></q-btn>
    </template>
    <template v-else>
      <q-btn
        class="rTemperatureSettingPage-btn mSmall"
        @click="state = states.default"
        label="Назад"
      ></q-btn>
      <q-select
        class="rTemperatureSettingPage-select mSmall"
        :options="timeFromOptions"
        dropdown-icon="▼"
        v-model="beginHour"
      ></q-select>
      <q-select
        class="rTemperatureSettingPage-select mSmall"
        :options="timeToOptions"
        dropdown-icon="▼"
        v-model="endHour"
      ></q-select>
      <q-btn
        @click="saveIntervals"
        class="rTemperatureSettingPage-btn mTopMargin"
        label="Сохранить интервал"
      ></q-btn>
    </template>
  </div>
</template>
<script>
import { authRequest } from '../../scripts/api';
export default {
  data() {
    return {
      choosedTemperature: 19,
      beginHour: { label: '08:00', value: 8 },
      endHour: { label: '16:00', value: 16 },
      state: 'default',
      states: {
        default: 'default',
        setTemperature: 'setTemperature',
        setInterval: 'setInterval',
      },
    };
  },
  computed: {
    currentTemperature() {
      return this.$store.state.temperature.currentTemperature || '—';
    },
    outsideTemperature() {
      return this.$store.state.temperature.outsideTemperature || '—';
    },
    desiredTemperature() {
      return this.$store.state.temperature.desiredTemperature || '—';
    },
    hasInterval() {
      return this.$store.state.temperature.hasInterval;
    },
    infoDescription() {
      let description;
      if (this.state === this.states.default) {
        description =
          'Вы можете задать желаемую температуру, или временный интервал, когда температуру можно будет понизить до 12°С';
      } else if (this.state === this.states.setTemperature) {
        description = 'Выберите желаемую температуру';
      } else {
        description =
          'Задайте интервал, когда температуру можно понизить до 12°С. Обычно это интервал, когда дома никого нет';
      }
      return description;
    },
    temperatureOptions() {
      let options = [];
      for (let i = 12; i < 28; i++) {
        options.push(i);
      }
      return options;
    },
    timeOptions() {
      let options = [];
      for (let i = 1; i < 25; i++) {
        if (i < 10) {
          options.push({ label: `0${i}:00`, value: i });
        } else {
          options.push({ label: `${i}:00`, value: i });
        }
      }
      return options;
    },
    timeToOptions() {
      const index = this.timeOptions.findIndex(
        t => t.value === this.beginHour.value,
      );
      return this.timeOptions.filter((t, i) => i > index);
    },
    timeFromOptions() {
      return this.timeOptions.slice(0, -1);
    },
  },
  methods: {
    saveTemperature() {
      this.$store.dispatch('temperature/sendTemperature', {
        data: {
          desiredTemperature: this.choosedTemperature,
          hasInterval: false,
        },
        userId: this.$store.state.client.id,
      });
    },
    saveIntervals() {
      this.$store.dispatch('temperature/sendTemperature', {
        data: {
          // desiredTemperature: this.desiredTemperature,
          hasInterval: true,
          beginHour: this.beginHour.value,
          endHour: this.endHour.value,
        },
        userId: this.$store.state.client.id,
      });
    },
    createHourObject(hour) {
      return hour < 10
        ? { label: `0${hour}:00`, value: hour }
        : { label: `${hour}:00`, value: hour };
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    beginHour(newVal) {
      const indexFrom = this.timeOptions.findIndex(
        t => t.value === this.beginHour.value,
      );
      const indexTo = this.timeOptions.findIndex(
        t => t.value === this.endHour.value,
      );
      if (indexFrom >= indexTo) {
        this.endHour = this.timeOptions[indexFrom + 1];
      }
    },
    desiredTemperature: {
      immediate: true,
      handler(newVal) {
        this.choosedTemperature = newVal;
      },
    },
  },
  mounted() {
    this.beginHour = this.createHourObject(
      this.$store.state.temperature.beginHour,
    );
    this.endHour = this.createHourObject(this.$store.state.temperature.endHour);
  },
};
</script>