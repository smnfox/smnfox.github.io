import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import { definePreset, palette } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import DialogService from 'primevue/dialogservice';

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
            surface: palette('{zinc}'),
          },
          dark: {
            surface: palette('{slate}'),
          },
        },
      },
    }),
  },
};

createApp(App).use(router).use(PrimeVue, primeVueOptions).use(DialogService).mount('#app');
