import Vue from 'vue';
import VueRouter from 'vue-router';
import rRootView from '../components/general/r-root-view.vue';
import rMainPage from '../components/pages/r-main-page.vue';
import rGeneralPage from '../components/general/r-general-page.vue';
import rTemperatureSettingPage from '../components/pages/r-temperature-setting-page.vue';
import rEconomyPage from '../components/pages/r-economy-page.vue';
import rProfilePage from '../components/pages/r-profile-page.vue';
import rProfileEditPage from '../components/pages/r-profile-edit-page.vue';
import rAuthPage from '../components/auth/r-auth-page.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: rRootView,
    children: [
      {
        path: 'auth',
        component: rAuthPage,
        name: 'auth-page',
        meta: { title: 'Авторизоваться' },
      },
      {
        path: '',
        component: rGeneralPage,
        children: [
          {
            path: '',
            component: rMainPage,
            name: 'main-page',
            meta: { title: 'Главная' },
          },
          {
            path: '/profile',
            component: rProfilePage,
            name: 'profile',
            meta: { title: 'Профиль' },
          },
          {
            path: '/profile/edit',
            component: rProfileEditPage,
            name: 'profile-edit',
            meta: { title: 'Редактировать профиль' },
          },
          {
            path: 'setting',
            component: rTemperatureSettingPage,
            name: 'setting',
            meta: { title: 'Управление температурой' },
          },
          {
            path: 'economy',
            component: rEconomyPage,
            name: 'economy',
            meta: { title: 'Экономия' },
          },
        ],
      },
    ],
  },
];
const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
