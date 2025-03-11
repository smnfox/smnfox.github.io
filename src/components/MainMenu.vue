<template>
    <div class="header">
        <router-link to="/">
            <img
                src="../assets/avatar.jpg"
                class="header__avatar"
                alt="avatar"
            />
        </router-link>
        <div class="header__menu">
            <router-link
                v-for="route in $router.options.routes"
                :key="route.path"
                :to="route.path"
                class="header__menu-link"
                :class="{ 'menu__link--active': route.path === $route.path }"
            >
                {{ route.name }}
            </router-link>
            <div
              class="header__menu-link"
              @click="toggleContacts"
            >
              Контакты
            </div>
            <div
              v-show="contactsVisible"
              class="header__contacts"
              ref="contactsElem"
            >
              <div
                v-for="contact in contacts"
                @click="openUrl(contact.link)"
                class="header__menu-link"
              >
                {{ contact.name }}
              </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {openUrl} from "../helpers.ts";
import {ref, useTemplateRef} from "vue";
import {onClickOutside} from "@vueuse/core";

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

const contacts: Contact[] = [
  {
    name: 'telegram',
    link: 'https://t.me/romanovalpm',
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
    border-radius: 0 0 12px 12px;
    position: relative;
    background: rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.25);

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

    &__menu-link {
        padding: 8px 16px;
        cursor: pointer;
        color: #021024;
        display: flex;
        place-content: center;
        border-radius: 4px;
        word-break: break-word;
        text-decoration: none;
        text-transform: uppercase;
        background-color: #ffffff;
        box-shadow: 0 3px 1px -2px #0003, 0 2px 2px 0 #00000024, 0 1px 5px 0 #0000001f;
        font-size: 14px;
        font-weight: 500;
        transition: box-shadow .3s;

        &:hover {
            box-shadow: 0 2px 4px -1px #0003, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f;
        }
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
