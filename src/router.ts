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
    },
    {
      name: 'Примеры кода',
      path: '/code-examples',
      component: ExamplesPage,
    },
    {
      name: 'Мини игра',
      path: '/game',
      component: GamePage,
    },
  ],
});
