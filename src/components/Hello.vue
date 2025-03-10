<script setup lang="ts">
import TypedText from './TypedText.vue';
import { Button } from 'primevue';
import Skills from "./Skills.vue";
import Timeline from 'primevue/timeline';
import {openUrl} from "../helpers.ts";

const helloTexts = [
  'Привет!',
  'Меня зовут Надя',
  'Я фронтенд разработчик :)',
];

const companies = [
{
    name: 'Playvision',
    dateStart: 'Февраль 2024',
    dateEnd: 'Февраль 2025',
    position: 'Frontend разработчик',
    description: 'Разработка и поддержка web-клиента игры durak.ru на vue3 + typescript + vite + nuxt + pinia, в том числе:<br>' +
' - Создание новых компонентов интерфейса, обязательно адаптивная и кроссбраузерная верстка<br>' +
' - Подключение к API по HTTP и WebSocket<br>' +
' - Рефакторинг старого кода и архитектуры приложения<br>' +
' - Оптимизация скорости приложения<br>' +
' - Создание css и js анимаций<br>' +
' - Кросс ревью других членов команды<br>' +
' - Участие в планировании задач и релизов<br>',
  },
  {
    name: 'LPmotor',
    dateStart: 'Июль 2020',
    dateEnd: 'Февраль 2024',
    position: 'Fullstack разработчик',
    description: 'Разработка нового и поддержка текущего функционала конструктора сайтов, в том числе:<br>' +
' - Написание нового интерфейса в spa на vue2 с использованием библиотеки компонентов ant design<br>' +
' - Поддержка и рефакторинг старых разделов монолита на php + jquery<br>' +
' - Написание на бэкэнде и подключение на клиенте API методов на php<br>' +
' - Написание гибко редактируемых виджетов для пользовательских сайтов на чистом javascript и внутреннем языке, созданном внутри команды<br>' +
' - Написание unit тестов на бэкэнде с PhpUnit и на фронтенде с Jest<br>' +
' - Код ревью, наставничество стажеров, лидерство в команде из 4-5 человек<br>',
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
      @click="openUrl('https://youtu.be/dQw4w9WgXcQ?si=NB9VIgFxnj4d024C')"
    />
  </section>
  <section class="screen screen-skills">
    <Skills />
  </section>
  <section class="screen screen--card screen-experience">
    <div class="screen__title">
      Коммерческий опыт работы
    </div>
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
          <div class="experience-timeline__subheader">
            {{ slotProps.item.dateStart }} - {{ slotProps.item.dateEnd }}
          </div>
          <div
            class="experience-timeline__text"
            v-html="slotProps.item.description"
          />
        </div>
      </template>
    </Timeline>
  </section>
  <section class="screen screen--card screen-about">
    <div class="screen__title">
      Обо мне
    </div>
    Ценю чистоту и читаемость кода, считаю и отстаиваю позицию, что качество важнее
    скорости. Тем не менее для меня самое важное это пользовательский опыт, так что я знаю баланс между "быстро решить боль клиента" и "потратить неделю на рефакторинг".
    <br><br>
    Всегда работала в команде, умею прислушиваться к чужому мнению, делиться опытом и вести диалог. Есть опыт наставничества, управления небольшим проектом. Есть опыт руководства командой в другой сфере (в поддержке пользователей).
    <br><br>
    Интересуюсь геймдевом, хожу на профильные мероприятия. Активно изучаю three.js в своих проектах.
    <br><br>
    Ищу только удаленку, но хочется иметь возможность посещать офис в Санкт-Петербурге, общаться с коллегами вживую :)
  </section>
</template>

<style scoped lang="scss">
.screen {
  width: 100%;
  padding: 0 24px;

  &--card {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 0 10px 20px;
    border: 1px solid;
  }

  &__title {
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    border: 1px solid;
    position: relative;
    top: -10px;
    left: 10px;
    width: max-content;
    padding: 2px 12px;
    align-self: flex-start;
    font-weight: 600;
  }
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
  flex-direction: column;
}

.screen-skills {
  position: relative;
  min-height: 150px;
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

.screen-about {
  font-weight: 400;
}
</style>
