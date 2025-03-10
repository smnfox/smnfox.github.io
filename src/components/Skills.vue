<template>
  <div class="splide">
    <div class="splide__track">
      <ul class="splide__list skills">
        <li
          v-for="skill in skills"
          class="splide__slide skills__card"
        >
          <component
            :is="skill.image"
            v-if="skill.image"
            class="skills__image"
          />
          {{ skill.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import {type Component, onMounted} from "vue";
import LogoJs from '../assets/logos/javascript.svg';
import LogoVue from '../assets/logos/vue.svg';
import LogoTs from '../assets/logos/typescript.svg';
import LogoGit from '../assets/logos/git.svg';
import LogoGithub from '../assets/logos/github.svg';
import LogoGitlab from '../assets/logos/gitlab.svg';
import LogoHtml from '../assets/logos/html5.svg';
import LogoCss from '../assets/logos/css3.svg';
import LogoSass from '../assets/logos/sass.svg';
import LogoVite from '../assets/logos/vite.svg?skipsvgo';
import LogoFigma from '../assets/logos/figma.svg';
import LogoWebstorm from '../assets/logos/webstorm.svg';
import LogoPrimevue from '../assets/logos/primevue.svg';

onMounted(() => {
  const splide = new Splide( '.splide', {
    type   : 'loop',
    drag   : 'free',
    focus  : 'center',
    arrows: false,
    pagination: false,
    autoWidth: true,
    autoScroll: {
      speed: 0.2,
    },
  });
  splide.mount({ AutoScroll });
});

const skills: Array<{name: string, image: Component | null}> = [
  {
    name: 'Javascript',
    image: LogoJs,
  },
  {
    name: 'Vue.js',
    image: LogoVue,
  },
  {
    name: 'Typescript',
    image: LogoTs,
  },
  {
    name: 'Git',
    image: LogoGit,
  },
  {
    name: 'GitHub',
    image: LogoGithub,
  },
  {
    name: 'GitLab',
    image: LogoGitlab,
  },
  {
    name: 'HTML',
    image: LogoHtml,
  },
  {
    name: 'CSS',
    image: LogoCss,
  },
  {
    name: 'SASS',
    image: LogoSass,
  },
  {
    name: 'Vite',
    image: LogoVite,
  },
  // {
  //   name: 'Jest',
  //   image: null,
  // },
  // {
  //   name: 'Jquery',
  //   image: null,
  // },
  {
    name: 'Figma',
    image: LogoFigma,
  },
  {
    name: 'WebStorm',
    image: LogoWebstorm,
  },
  // {
  //   name: 'Axios',
  //   image: null,
  // },
  // {
  //   name: 'AntDesign',
  //   image: null,
  // },
  {
    name: 'PrimeVue',
    image: LogoPrimevue,
  },
  // {
  //   name: 'Responsive',
  //   image: null,
  // },
];
</script>

<style scoped lang="scss">
@import '@splidejs/splide/dist/css/splide-core.min.css';

.splide {
  position: absolute;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
}

.skills {
  gap: 12px;

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    border-radius: 10px;
    padding: 10px;
    gap: 10px;
  }
}
</style>
