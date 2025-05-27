import { createApp } from 'vue';
import './styles/main.css';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import { definePreset, palette } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import DialogService from 'primevue/dialogservice';
import {useStorage} from '@vueuse/core';

const primeVueOptions = {
  theme: {
    options: {
      darkModeSelector: '.portfolio-dark',
    },
    preset: definePreset(Aura, {
      semantic: {
        primary: palette('{violet}'),
        colorScheme: {
          light: {
            primary: {
              color: '{violet.400}',
            },
            surface: palette('{slate}'),
          },
          dark: {
            primary: {
              color: '{violet.600}',
            },
            surface: palette('{zinc}'),
          },
        },
      },
    }),
  },
};

createApp(App).use(router).use(PrimeVue, primeVueOptions).use(DialogService).mount('#app');

const darkMode = useStorage('dark-mode', false);
if (darkMode.value) {
  document.documentElement.classList.add('portfolio-dark');
}
