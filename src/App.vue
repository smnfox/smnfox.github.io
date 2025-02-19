<script setup lang="ts">
import { onBeforeMount } from 'vue';
import MainMenu from './components/MainMenu.vue';
import { sounds } from './services/sounds';
import Blob from "./assets/blob.svg";
import PageFooter from './components/PageFooter.vue';

onBeforeMount(() => {
    sounds.muteOnVisibilityChange();
});
</script>

<template>
    <Blob class="gradient" />
    <MainMenu class="menu" />
    <div class="content">
        <router-view />
    </div>
    <PageFooter />
</template>

<style lang="scss">
@import 'primeicons/primeicons.css';

.menu {
    width: 100%;
    flex-shrink: 0;
}

.content {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    place-content: flex-start;
    gap: 24px;
}

.gradient {
  width: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
}
</style>
