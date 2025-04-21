<script setup lang="ts">
import TypedText from './TypedText.vue';
import { Button } from 'primevue';
import SkillsCarousel from './SkillsCarousel.vue';
import Timeline from 'primevue/timeline';
import {openUrl} from '../helpers.ts';
import {contacts, rickrollLink} from '../constants';
import plural from 'plural-ru';

const helloTexts = [
  'Привет!',
  'Меня зовут Надя',
  'Я фронтенд разработчик :)',
];

const companies = [
{
    name: 'Playvision',
    dateStart: '2024-02',
    dateEnd: '2025-02',
    position: 'Frontend разработчик',
    description: 'Разработка и поддержка web-версии карточной игры Дурак онлайн',
    stack: 'Vue3 + Typescript + Vite + Nuxt + Pinia',
    responsibilities: [
      'Создание новых компонентов интерфейса',
      'Подключение к API по HTTP и WebSocket',
      'Рефакторинг старого кода и архитектуры приложения',
      'Оптимизация скорости приложения',
      'Создание css и js анимаций',
      'Код ревью, помощь другим членам команды',
      'Участие в планировании задач и релизов',
    ],
  },
  {
    name: 'LPmotor',
    dateStart: '2020-07',
    dateEnd: '2024-02',
    position: 'Fullstack разработчик',
    description: 'Разработка и поддержка редактора, виджетов и личного кабинета конструктора сайтов',
    stack: 'Vue2 + Javascript + Jquery + Php + Mysql',
    responsibilities: [
      'Написание нового интерфейса админ панели с использованием библиотеки компонентов ant design',
      'Поддержка и рефакторинг старых разделов сервиса на php + jquery',
      'Написание на бэкэнде и подключение на клиенте новых API методов на php',
      'Создание гибко редактируемых виджетов для сайтов на чистом javascript с локальными инструментами, созданными внутри команды',
      'Написание unit тестов на бэкэнде с PhpUnit и на фронтенде с Jest',
      'Код ревью, наставничество стажеров, лидерство в команде из 4-5 человек',
    ],
  },
];

const getDateDiff = (from: string, to: string): string => {
  const dateFrom = new Date(from);
  const dateTo = new Date(to);
  const diff = dateTo.getTime() - dateFrom.getTime();
  const years = new Date(diff).getUTCFullYear() - 1970;
  const months = new Date(diff).getUTCMonth();
  const yearsString = years ? `${years} ${plural(years, 'год', 'года', 'лет')} ` : '';
  const monthsString = months ? `${months} ${plural(months, 'месяц', 'месяца', 'месяцев')}` : '';
  return `${yearsString}${monthsString}`;
};

const getDateRange = (from: string, to: string): string => {
  const dateFrom = new Date(from);
  const dateTo = new Date(to);
  const options = {
    year: 'numeric',
    month: 'long',
  };
  const dateFromString = `${dateFrom.toLocaleString('ru-RU', options).replace(/^./, str => str.toUpperCase())}`;
  const dateToString = `${dateTo.toLocaleString('ru-RU', options).replace(/^./, str => str.toUpperCase())}`;
  return `${dateFromString} - ${dateToString}`;
};
</script>

<template>
  <section class="screen screen-hello">
    <div class="screen-hello__texts">
      <TypedText :texts="helloTexts" />
      <p>
        <span>Ищу удаленную работу, пишу на Vue.js + Typescript</span>
        <br>
        <span>В коммерческой разработке с 2020 года</span>
      </p>
      <div class="screen-hello__actions">
        <Button
          label="Резюме"
          icon="pi pi-file-pdf"
          icon-pos="right"
          as="a"
          :href="contacts.resume"
          target="_blank"
          raised
        />
        <Button
          label="Телеграм"
          icon="pi pi-telegram"
          icon-pos="right"
          as="a"
          :href="contacts.telegram"
          target="_blank"
          raised
        />
      </div>
    </div>
    <img
      src="../assets/emoji.webp"
      class="screen-hello__image"
      alt="emoji"
      @click="openUrl(rickrollLink)"
    >
  </section>
  <section class="screen screen-skills">
    <SkillsCarousel />
  </section>
  <section class="screen screen--card screen-experience">
    <div class="screen__title">
      Коммерческий опыт работы
    </div>
    <Timeline
      :value="companies"
      class="experience-timeline"
    >
      <template #opposite="slotProps">
        <div class="experience-timeline__subheader">
          {{ getDateRange(slotProps.item.dateStart, slotProps.item.dateEnd) }}
        </div>
      </template>
      <template #content="slotProps">
        <div class="experience-timeline__content">
          <div class="experience-timeline__header">
            {{ slotProps.item.name }}
          </div>
          <div class="experience-timeline__subheader">
            {{ slotProps.item.position }}
          </div>
          <div class="experience-timeline__subheader">
            {{ getDateDiff(slotProps.item.dateStart, slotProps.item.dateEnd) }}
          </div>
          <div class="experience-timeline__text">
            Основной стэк: {{ slotProps.item.stack }}
          </div>
          <div class="experience-timeline__text">
            {{ slotProps.item.description }}
          </div>
          <ul class="experience-timeline__text">
            <li
              v-for="(item, index) in slotProps.item.responsibilities"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </template>
    </Timeline>
  </section>
  <section class="screen screen--card screen-about">
    <div class="screen__title">
      Обо мне
    </div>
    Ценю чистоту и читаемость кода, считаю и отстаиваю позицию, что качество важнее
    скорости. Но еще важнее пользовательский опыт, так что я знаю баланс между "залить по быстрому без ревью и тестов" и "потратить месяц на рефакторинг".
    <br><br>
    Всегда работала в команде, умею прислушиваться к чужому мнению, обмениваться опытом и договариваться, в том числе с коллегами из других команд. Есть опыт наставничества и управления небольшим проектом.
    <br><br>
    Интересуюсь геймдевом, хожу на профильные мероприятия. Активно изучаю three.js в своих проектах.
    <br><br>
    Ищу только удаленку, но будет круто иметь возможность иногда посещать офис в Санкт-Петербурге и встречаться с коллегами :)
  </section>
</template>

<style scoped lang="scss">
.screen {
  width: 100%;
  padding: 0 24px;

  &--card {
    border-radius: 10px;
    padding: 0 10px 20px;
    border: 1px solid var(--p-primary-400);
    background: rgba(255, 255, 255, 0.5);
  }

  &__title {
    border-radius: 10px;
    border: 1px solid var(--p-primary-400);
    position: relative;
    top: -10px;
    left: 10px;
    width: max-content;
    padding: 2px 12px;
    align-self: flex-start;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(8px);
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
    width: 300px;
    aspect-ratio: 1 / 1;
  }
}

.screen-experience {
  display: flex;
  justify-content: center;
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

:deep(.p-timeline-event-opposite) {
  flex: 0 0 20%;
}
</style>
