<script setup lang="ts">
import { onBeforeMount } from 'vue';
import MainMenu from './components/MainMenu.vue';
import { sounds } from './services/sounds';
import Blob from './assets/blob.svg';
import PageFooter from './components/PageFooter.vue';
import DynamicDialog from 'primevue/dynamicdialog';

onBeforeMount(() => {
    sounds.muteOnVisibilityChange();
});
</script>

<template>
  <Blob class="app-gradient" />
  <MainMenu class="app-menu" />
  <div class="app-content">
    <router-view />
  </div>
  <PageFooter />
  <DynamicDialog />
</template>

<style lang="scss">
@import 'primeicons/primeicons.css';

.app-menu {
    flex-shrink: 0;
}

.app-content {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    place-content: flex-start;
    gap: 24px;
    margin-top: 60px;
}

.app-gradient {
  width: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
}
</style>
