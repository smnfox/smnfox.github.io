<script setup lang="ts">
import { onBeforeMount } from 'vue';
import MainMenu from './components/MainMenu.vue';
import sounds from './services/sounds';
import Contacts from './components/Contacts.vue';

onBeforeMount(() => {
    sounds.muteOnVisibilityChange();
});
</script>

<template>
    <Contacts />
    <MainMenu class="menu" />
    <div class="content">
        <router-view />
    </div>
</template>

<style scoped lang="scss">
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
</style>
