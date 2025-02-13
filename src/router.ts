import { createRouter, createWebHistory } from 'vue-router';
import Game from './components/Game.vue';
import Examples from './components/Examples.vue';
import Hello from './components/Hello.vue';
import Projects from './components/Projects.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'hello',
      path: '/',
      component: Hello,
    },
    {
      name: 'projects',
      path: '/projects',
      component: Projects,
    },
    {
      name: 'examples',
      path: '/code-examples',
      component: Examples,
    },
    {
      name: 'game',
      path: '/game',
      component: Game,
    },
  ],
});
