<script setup lang="ts">
import TypedText from './TypedText.vue';
import { Button } from 'primevue';

const helloTexts = [
  'Привет!',
  'Меня зовут Надя',
  'Я фронтенд разработчик :)',
];
</script>

<template>
  <section class="screen-hello">
    <div class="screen-hello__texts">
      <TypedText :texts="helloTexts" />
      <p>Some cool introduction text</p>
      <div class="screen-hello__actions">
        <Button
          label="Резюме"
          icon="pi pi-file-pdf"
          icon-pos="right"
        />
        <Button
          label="Телеграм"
          icon="pi pi-telegram"
          icon-pos="right"
        />
      </div>
    </div>
    <img
      src="../assets/emoji.webp"
      class="screen-hello__image"
    />
  </section>
  <section class="screen-about">
    out and about...
  </section>
</template>

<style scoped lang="scss">
.screen-hello {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(100vh - 100px);
  max-height: 732px;

  &__texts {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__actions {
    display: flex;
    gap: 8px;
  }

  &__image {
    width: 200px;
    aspect-ratio: 1 / 1;
  }
}
</style>
