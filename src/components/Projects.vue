<template>
<h1>Проекты, над которыми я работала</h1>
<div class="projects">
  <div
    v-for="project in projects"
    class="project"
    ref="projectCards"
    @click="openUrl(project.link)"
  >
    {{ project.name }}
    <img
      :src='project.image'
      class='project__image'
      :alt="project.name"
    />
  </div>
</div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, type ShallowRef, useTemplateRef} from 'vue';
import { openUrl } from '../helpers';
import VanillaTilt from 'vanilla-tilt';

interface Project {
  name: string
  link: string
  image: string
}

const projects: Project[] = [
  {
    name: 'mottor',
    link: 'https://lpmotor.ru',
    image: '/assets/lpmotor.webp',
  },
  {
    name: 'durak',
    link: 'https://durak.ru',
    image: '/assets/durak.webp',
  },
];

const projectCards: ShallowRef<Array<any> | null> = useTemplateRef('projectCards');

onMounted(() => {
  VanillaTilt.init(projectCards.value);
});

onUnmounted(() => {
  projectCards.value?.forEach((card) => {
    card.vanillaTilt.destroy();
  });
});
</script>

<style scoped lang="scss">
.projects {
  display: flex;
  gap: 24px;
}

.project {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 12px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  flex-grow: 1;
  cursor: pointer;

  &__image {
    max-width: 100%;
  }
}
</style>
