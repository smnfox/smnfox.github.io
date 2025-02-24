<script setup lang="ts">
import TypedText from './TypedText.vue';
import { Button } from 'primevue';
import Skills from "./Skills.vue";
import Timeline from 'primevue/timeline';

const helloTexts = [
  'Привет!',
  'Меня зовут Надя',
  'Я фронтенд разработчик :)',
];

const companies = [
{
    name: 'Playvision',
    dateStart: '',
    dateEnd: '',
    position: 'Frontend разработчик',
    description: 'Разработка и поддержка web-клиента игры durak.ru на vue3 + typescript + vite + nuxt + pinia, в том числе:' +
' - Создание новых компонентов интерфейса, обязательно адаптивная и кроссбраузерная верстка' +
' - Подключение к API по HTTP и WebSocket' +
' - Рефакторинг старого кода и архитектуры приложения' +
' - Оптимизация скорости приложения' +
' - Создание css и js анимаций' +
' - Кросс ревью других членов команды' +
' - Участие в планировании задач и релизов',
  },
  {
    name: 'LPmotor',
    dateStart: '',
    dateEnd: '',
    position: 'Fullstack разработчик',
    description: 'Разработка нового и поддержка текущего функционала конструктора сайтов, в том числе:' +
' - Написание нового интерфейса в spa на vue2 с использованием библиотеки компонентов ant design' +
' - Поддержка и рефакторинг старых разделов монолита на php + jquery' +
' - Написание на бэкэнде и подключение на клиенте API методов на php' +
' - Написание гибко редактируемых виджетов для пользовательских сайтов на чистом javascript и внутреннем языке, созданном внутри команды' +
' - Написание unit тестов на бэкэнде с PhpUnit и на фронтенде с Jest' +
' - Код ревью, наставничество стажеров, лидерство в команде из 4-5 человек',
  },
];
</script>

<template>
  <section class="screen screen-hello">
    <div class="screen-hello__texts">
      <TypedText :texts="helloTexts" />
      <p>
        <span>Ищу удаленную работу, пишу на Vue.js + Typescript</span>
        <br/>
        <span>В коммерческой разработке с 2020 года</span>
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
    <Timeline
      :value="companies"
      align="alternate"
      class="experience-timeline"
    >
      <template #content="slotProps">
        <div class="experience-timeline__content">
          <div class="experience-timeline__header">
            {{ slotProps.item.name }}
          </div>
          <div class="experience-timeline__subheader">
            {{ slotProps.item.position }}
          </div>
          <div class="experience-timeline__text">
            {{ slotProps.item.description }}
          </div>
        </div>
      </template>
    </Timeline>
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
  max-height: 500px;

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

.screen-experience {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
  max-height: 500px;
}

.experience-timeline {
  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__header {
    font-size: 20px;
    font-weight: 700;
  }

  &__text {
    font-weight: 400;
  }
}
</style>
