import { createRouter, createWebHistory } from 'vue-router';
import GamePage from './components/GamePage.vue';
import ExamplesPage from './components/ExamplesPage.vue';
import HelloPage from './components/HelloPage.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Главная',
      path: '/',
      component: HelloPage,
      meta: {
        icon: 'home',
      },
    },
    // {
    //   name: 'Примеры кода',
    //   path: '/code-examples',
    //   component: ExamplesPage,
    //   meta: {
    //     icon: 'code',
    //   },
    // },
    {
      name: 'Мини игра',
      path: '/game',
      component: GamePage,
      meta: {
        icon: 'circle',
      },
    },
  ],
});
