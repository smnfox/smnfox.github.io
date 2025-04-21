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
        v-for="route in $router.options.routes"
        :key="route.path"
        v-slot="slotProps"
        as-child
        raised
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
        raised
        @click="toggleContacts"
      />
      <div
        v-show="contactsVisible"
        ref="contactsElem"
        class="header__contacts"
      >
        <Button
          v-for="contact in contactsList"
          :key="contact.name"
          :label="contact.name"
          raised
          @click="openUrl(contact.link)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {openUrl} from '../helpers.ts';
import {ref, useTemplateRef} from 'vue';
import {onClickOutside} from '@vueuse/core';
import {Button} from 'primevue';
import {contacts} from '../constants';

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

interface Contact {
  name: string
  link: string
}

const contactsList: Contact[] = [
  {
    name: 'telegram',
    link: contacts.telegram,
  },
  {
    name: 'email',
    link: 'mailto:smnfox61@gmail.com',
  },
  {
    name: 'github',
    link: 'https://github.com/smnfox',
  },
  {
    name: 'pdf',
    link: '/resume.pdf',
  },
];
</script>

<style scoped lang="scss">
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

    &__contacts {
      position: absolute;
      right: 8px;
      top: 53px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 1;
    }
}
</style>
