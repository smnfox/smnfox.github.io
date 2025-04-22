<script setup lang="ts">
import TypedText from './TypedText.vue';
import { Button } from 'primevue';
import SkillsCarousel from './SkillsCarousel.vue';
import {openUrl} from '../helpers.ts';
import {contacts, helloTexts, rickrollLink} from '../constants';
import ProjectCards from './ProjectCards.vue';
import ExperienceTimeline from './ExperienceTimeline.vue';
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
          label="GitHub"
          icon="pi pi-github"
          icon-pos="right"
          as="a"
          :href="contacts.github"
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
  <ExperienceTimeline />
  <ProjectCards />
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
    background: var(--p-card-background);
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
    background: var(--p-card-background);
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

.screen-skills {
  position: relative;
  min-height: 160px;
}

.screen-about {
  font-weight: 400;
}
</style>
