<style lang="scss">
.rProfilePage {
  @include sidebar-padding;
  min-height: 100vh;
  padding-top: 72px;
  &-header {
    @include h1;
  }
  &-container {
    width: 100%;
    margin-top: 72px;
    max-width: 432px;
  }
  &-label {
    @include p2;
    color: $grey-4;
  }
  &-value {
    @include p1;
    color: $dark;
    margin-top: 24px;
  }
  &-row {
    &:nth-child(n + 1) {
      margin-top: 48px;
    }
  }
  &-link {
    margin-top: 72px;
    display: block;
    color: $blue;
    text-decoration: none;
    transition: color 0.3s;
    &:hover {
      color: $grey-3;
    }
  }
}
</style>
<template>
  <div class="rProfilePage">
    <div class="rProfilePage-header">Профиль</div>
    <div class="rProfilePage-container">
      <div class="rProfilePage-row r-row">
        <div class="rProfilePage-block r-col-12 r-col-md-6">
          <div class="rProfilePage-label">Фамилия Имя Отчество</div>
          <div class="rProfilePage-value">{{ FIO }}</div>
        </div>
        <div class="rProfilePage-block r-col-12 r-col-md-6">
          <div class="rProfilePage-label">Пол</div>
          <div class="rProfilePage-value">{{ gender}}</div>
        </div>
      </div>
      <div class="rProfilePage-row r-row">
        <div class="rProfilePage-block r-col-12 r-col-md-6">
          <div class="rProfilePage-label">Эл. почта</div>
          <div class="rProfilePage-value">{{ email }}</div>
        </div>
      </div>
    </div>
    <router-link class="rProfilePage-link" :to="{ name: 'profile-edit' }">Редактировать профиль</router-link>
  </div>
</template>
<script>
export default {
  computed: {
    FIO() {
      const { firstName, lastName, middleName } = this.$store.state.client;
      return `${firstName} ${lastName} ${middleName}`.trim() || '—';
    },
    gender() {
      return this.$store.state.client.gender || '—';
    },
    email() {
      return this.$store.state.client.email || '—';
    },
  },
};
</script>
