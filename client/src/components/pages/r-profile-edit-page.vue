<style lang='scss'>
.rProfileEditPage {
  @include sidebar-padding;
  padding-top: 72px;
  padding-bottom: 48px;
  max-width: 610px;
  &-icon {
    display: block;
    margin-bottom: 24px;
  }
  &-header {
    @include h1;
    margin-bottom: 48px;
  }
  &-row {
    @include respond-to('md') {
      margin-top: 24px;
    }
  }
  &-input {
    margin-top: 24px;
    @include respond-to('md') {
      margin-top: 0;
    }
  }
  &-btn {
    display: block;
    margin-top: 24px;
  }
}
</style>
<template>
  <div class="rProfileEditPage">
    <r-icon
      class="rProfileEditPage-icon"
      :size="16"
      pointer
      name="Arrow"
      @click="$router.push({name: 'profile'})"
    ></r-icon>
    <div class="rProfileEditPage-header">Редактирование профиля</div>
    <div class="rProfileEditPage-container">
      <div class="rProfileEditPage-row r-row">
        <q-input
          class="rProfileEditPage-input r-col-12 r-col-md-6"
          v-model="user.lastName"
          label="Фамилия"
          secondary
        ></q-input>
        <q-input
          class="rProfileEditPage-input r-col-12 r-col-md-6"
          v-model="user.firstName"
          label="Имя"
          secondary
        ></q-input>
      </div>
      <div class="rProfileEditPage-row r-row">
        <q-input
          class="rProfileEditPage-input r-col-12 r-col-md-6"
          v-model="user.middleName"
          label="Отчество"
          secondary
        ></q-input>
      </div>
      <div class="rProfileEditPage-row r-row">
        <q-input
          class="rProfileEditPage-input r-col-12 r-col-md-6"
          v-model="user.gender"
          label="Пол"
        ></q-input>
        <q-input
          class="rProfileEditPage-input r-col-12 r-col-md-6"
          v-model="user.email"
          label="Эл. почта"
          secondary
        ></q-input>
      </div>
      <q-btn class="rProfileEditPage-btn" @click="submit" label="Сохранить изменения"></q-btn>
    </div>
  </div>
</template>
<script>
import { authRequest } from '../../scripts/api';
import rIcon from '../common/r-icon';
export default {
  components: {
    rIcon,
  },
  data: () => {
    return {
      user: {
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        email: '',
      },
    };
  },
  methods: {
    fillForm() {
      this.user = {
        firstName: this.$store.state.client.firstName,
        middleName: this.$store.state.client.middleName,
        lastName: this.$store.state.client.lastName,
        gender: this.$store.state.client.gender,
        email: this.$store.state.client.mail,
      };
    },
    submit() {
      authRequest
        .put('/api/user/update', {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          middleName: this.user.middleName,
          gender: this.user.gender,
          email: this.user.email,
        })
        .then(res => {
          this.$store.commit('client/putState', res.data);
          this.fillForm();
          this.$router.push({ name: 'profile' });
        })
        .catch(err => {
          this.$q.notify({
            color: white,
            message: err.response.data.message || 'Wrong ((',
          });
        });
    },
  },
  mounted() {
    this.fillForm();
  },
};
</script>