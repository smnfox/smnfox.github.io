<template>
  <h1>Проекты, над которыми я работала</h1>
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
    name: 'State Editor - визуальный редактор стейтов приложения',
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
.projects {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
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
  max-width: calc(100% / 2 - 24px);

  &__image {
    max-width: 100%;
  }
}
</style>
