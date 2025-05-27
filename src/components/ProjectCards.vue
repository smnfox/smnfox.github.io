<template>
  <h2>Проекты, над которыми я работала</h2>
  <div class="projects">
    <div
      v-for="project in projects"
      :key="project.name"
      ref="projectCards"
      class="project"
      @click="openDialog(project.name, project.component)"
    >
      {{ project.name }}
      <img
        :src="project.image"
        class="project__image"
        :alt="project.name"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import {type Component, onMounted, onUnmounted, type ShallowRef, useTemplateRef} from 'vue';
import VanillaTilt from 'vanilla-tilt';
import {useDialog} from 'primevue';
import MottorModal from './MottorModal.vue';
import DurakModal from './DurakModal.vue';
import EditorModal from './EditorModal.vue';
import MinecraftModal from './MinecraftModal.vue';
import JamModal from './JamModal.vue';
import ResumeModal from "./ResumeModal.vue";

interface Project {
  name: string;
  link: string;
  image: string;
  component: Component;
}

const dialog = useDialog();

const openDialog = (name: string, component: Component) => {
  dialog.open(component, {
    props: {
      header: name,
      modal: true,
      dismissableMask: true,
      closeOnEscape: true,
      style: {
        width: '720px',
        height: '80vh',
      },
    },
  });
};

const projects: Project[] = [
  {
    name: 'Mottor',
    link: 'https://lpmotor.ru',
    image: '/assets/lpmotor.webp',
    component: MottorModal,
  },
  {
    name: 'Дурак Онлайн - карточная игра',
    link: 'https://durak.ru',
    image: '/assets/durak.webp',
    component: DurakModal,
  },
  {
    name: 'State Editor - визуальный редактор состояний приложения',
    link: '',
    image: '/assets/ssmeditor.webp',
    component: EditorModal,
  },
  {
    name: 'Minecraft',
    link: 'https://smnfox.github.io/minecraft',
    image: '/assets/minecraft.webp',
    component: MinecraftModal,
  },
  {
    name: 'Jam AI client',
    link: '',
    image: '/assets/aiassistant.png',
    component: JamModal,
  },
  {
    name: 'Резюме',
    link: '/',
    image: '/assets/resume.png',
    component: ResumeModal,
  },
];

const projectCards: ShallowRef<Array<HTMLDivElement> | null> = useTemplateRef('projectCards');

onMounted(() => {
  if (!projectCards.value) {
    return;
  }
  VanillaTilt.init(projectCards.value);
});

onUnmounted(() => {
  projectCards.value?.forEach((card) => {
    card.vanillaTilt.destroy();
  });
});
</script>

<style scoped lang="scss">
@use '../styles/breakpoints' as *;

.projects {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.project {
  @include break-to(s, m) using($br-name) {
    max-width: 100%;
  }

  background: var(--p-card-background);
  color: var(--p-card-color);
  border-radius: 10px;
  box-shadow: var(--p-card-shadow);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: var(--p-card-body-padding);
  gap: 12px;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  flex-grow: 1;
  cursor: pointer;
  max-width: calc(100% / 2 - 24px);

  &__image {
    max-width: 100%;
  }
}
</style>
