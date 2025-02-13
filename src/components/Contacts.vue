<template>
<div class="contacts">
  <Button>
    Click
  </Button>
  <div class="contacts__wrapper">
    <Button
      v-for="contact in contacts"
      @click="openUrl(contact.link)"
    >
      {{ contact.name }}
    </Button>
  </div>
</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { openUrl } from "../helpers";

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
    name: 'github',
    link: 'https://github.com/smnfox',
  },
  {
    name: 'email',
    link: '',
  },
  {
    name: 'pdf',
    link: '',
  },
];
</script>

<style scoped lang="scss">
.contacts {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 50px;
  bottom: 50px;
  z-index: 2;
  gap: 8px;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
