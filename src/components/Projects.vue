<template>
<div class="projects">
  <div
    v-for="project in projects"
    class="projects__card"
    @click="openUrl(project.link)"
  >
    {{ project.name }}
  </div>
</div>
</template>

<script setup lang="ts">
import { openUrl } from '../helpers';

interface Project {
  name: string
  link: string
}

const projects: Project[] = [
  {
    name: 'mottor',
    link: 'https://lpmotor.ru',
  },
  {
    name: 'durak',
    link: 'https://durak.ru',
  },
];
</script>

<style scoped lang="scss">
.projects {
  display: flex;
  gap: 24px;

  &__card {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 10px;
    display: flex;
    flex-direction: column;
    place-content: center;
    place-items: center;
    flex-grow: 1;
    cursor: pointer;
  }
}
</style>
