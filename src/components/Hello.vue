<script setup lang="ts">
import TypedText from './TypedText.vue';
import { Button } from 'primevue';
import Skills from "./Skills.vue";

const helloTexts = [
  'Привет!',
  'Меня зовут Надя',
  'Я фронтенд разработчик :)',
];
</script>

<template>
  <section class="screen screen-hello">
    <div class="screen-hello__texts">
      <TypedText :texts="helloTexts" />
      <p>
        <span>Пишу на Vue.js + Typescript, в коммерческой разработке с 2020 года</span>
        <br/>
        <span>Живу в Санкт-Петербурге, ищу удаленную работу</span>
      </p>
      <div class="screen-hello__actions">
        <Button
          label="Резюме"
          icon="pi pi-file-pdf"
          icon-pos="right"
          as="a"
          href="/resume.pdf"
          target="_blank"
          raised
        />
        <Button
          label="Телеграм"
          icon="pi pi-telegram"
          icon-pos="right"
          as="a"
          href="https://t.me/romanovalpm"
          target="_blank"
          raised
        />
      </div>
    </div>
    <img
      src="../assets/emoji.webp"
      class="screen-hello__image"
      alt="emoji"
    />
  </section>
  <section class="screen screen-skills">
    <Skills />
  </section>
  <section class="screen screen-experience">
    Тут про опыт работы
  </section>
  <section class="screen screen-about">
    Тут общая инфа обо мне
  </section>
</template>

<style scoped lang="scss">
.screen {
  width: 100%;
  padding: 0 24px;
}

.screen-hello {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(100vh - 100px);
  max-height: 732px;

  &__texts {
    display: flex;
    flex-direction: column;
    gap: 12px;
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
