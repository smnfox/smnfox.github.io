import { createRouter, createWebHistory } from 'vue-router';
import Game from './components/Game.vue';
import Examples from './components/Examples.vue';
import Hello from './components/Hello.vue';
import Projects from './components/Projects.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Главная',
      path: '/',
      component: Hello,
    },
    {
      name: 'Проекты',
      path: '/projects',
      component: Projects,
    },
    {
      name: 'Примеры кода',
      path: '/code-examples',
      component: Examples,
    },
    {
      name: 'Мини игра',
      path: '/game',
      component: Game,
    },
  ],
});
