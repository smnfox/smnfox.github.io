<template>
  <div class="header">
    <router-link to="/">
      <img
        src="../assets/avatar.jpg"
        class="header__avatar"
        alt="avatar"
      >
    </router-link>
    <div class="header__menu">
      <Button
        :icon="darkMode ? 'pi pi-moon' : 'pi pi-sun'"
        @click="toggleDarkMode"
      />
      <div class="header__menu-for-pc">
        <Divider layout="vertical" />
        <Button
          v-for="route in $router.options.routes"
          :key="route.path"
          v-slot="slotProps"
          as-child
        >
          <RouterLink
            :to="route.path"
            :class="slotProps.class"
          >
            {{ route.name }}
          </RouterLink>
        </Button>
        <Button
          label="Контакты"
          @click="toggleContacts"
        />
        <div
          ref="contactsElem"
          class="header__contacts"
          :class="contactsVisible ? 'header__contacts--visible' : ''"
        >
          <Button
            v-for="(contact, index) in contactsList"
            :key="contact.name"
            :class="`header__contacts-btn header__contacts-btn--${index + 1}`"
            :label="contact.name"
            raised
            @click="openUrl(contact.link)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {openUrl} from '../helpers.ts';
import {ref, useTemplateRef} from 'vue';
import {onClickOutside, useStorage} from '@vueuse/core';
import {Button, Divider} from 'primevue';
import {contactsList} from '../constants';

const contactsVisible = ref(false);
const toggleContacts = (event: Event) => {
  event.stopPropagation();
  contactsVisible.value = !contactsVisible.value;
};

const contactsElem = useTemplateRef<HTMLElement>('contactsElem');
onClickOutside(contactsElem, (event: Event) => {
  if (contactsVisible.value) {
    toggleContacts(event);
  }
});

const darkMode = useStorage('dark-mode', false);
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  document.documentElement.classList.toggle('portfolio-dark');
};
</script>

<style scoped lang="scss">
@use '../styles/breakpoints' as *;

.header {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0 0 var(--p-border-radius-xl) var(--p-border-radius-xl);
    position: fixed;
    top: 0;
    width: calc(100% - 20px);
    max-width: 1060px;
    background: rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.25);
    z-index: 1;
    backdrop-filter: blur(8px);

    &__avatar {
        overflow: hidden;
        border-radius: 50%;
        aspect-ratio: 1 / 1;
        width: 40px;
        border: 1px solid #ffffff;
        cursor: pointer;
    }

    &__menu {
        min-width: 20%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
    }

    &__menu-for-pc {
      @include break-to(s) using($br-name) {
        display: none;
      }

      display: flex;
      gap: 4px;
    }

    &__contacts {
      position: absolute;
      right: 8px;
      top: calc(100% - 4px);
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 1;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      perspective: 1000px;

      &--visible {
        opacity: 1;
        visibility: visible;

        @for $i from 1 through 4 {
          .header__contacts-btn--#{$i} {
            transform-origin: top center;
            animation: scaleZ 300ms calc(#{$i} * 60ms) ease-in-out forwards;
          }
        }
      }
    }

    &__contacts-btn {
      opacity: 0;
    }
}

@keyframes scaleZ {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  80% {
    transform: scale(1.07);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
