<script setup lang="ts">
import TypedText from './TypedText.vue';
import { Button, Card, ButtonGroup } from 'primevue';
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
        <ButtonGroup>
          <Button
            label="Резюме"
            icon="pi pi-file-pdf"
            icon-pos="right"
            as="a"
            :href="contacts.resume"
            target="_blank"
          />
          <Button
            label="GitHub"
            icon="pi pi-github"
            icon-pos="right"
            as="a"
            :href="contacts.github"
            target="_blank"
          />
          <Button
            label="Телеграм"
            icon="pi pi-telegram"
            icon-pos="right"
            as="a"
            :href="contacts.telegram"
            target="_blank"
          />
        </ButtonGroup>
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
  <h2>Коротко обо мне</h2>
  <Card>
    <template #content>
      Считаю себя уверенным Middle/Middle+ разработчиком, с широким кругозором. Ценю чистоту и читаемость кода, борюсь за качество и пользовательский опыт - 2 года до разработки работала в службе поддержки.
      <br><br>
      Всегда работала в команде, умею прислушиваться к чужому мнению, обмениваться опытом и договариваться, в том числе с коллегами из других команд. Есть опыт наставничества и управления небольшим проектом.
      <br><br>
      Интересуюсь геймдевом, хожу на профильные мероприятия. Активно изучаю three.js в своих проектах.
      <br><br>
      Ищу только удаленку, но будет круто иметь возможность иногда посещать офис в Санкт-Петербурге :)
    </template>
  </Card>
  <ExperienceTimeline />
  <ProjectCards />
</template>

<style scoped lang="scss">
@use '../styles/breakpoints' as *;

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
  @include break-to(s) using($br-name) {
    flex-direction: column;
    max-height: none;
    height: auto;
    gap: 16px;
    padding-top: 16px;
  }

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
    @include break-to(s) using($br-name) {
      width: 60%;
    }

    width: 40%;
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
