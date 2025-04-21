<template>
  <ScrollPanel>
    <div>Web версия популярной игры minecraft</div>
    <br>
    <Button
      label="Открыть"
      as="a"
      href="https://smnfox.github.io/minecraft"
      target="_blank"
      raised
    />
    <Button
      label="Репозиторий"
      as="a"
      href="https://github.com/smnfox/minecraft"
      target="_blank"
      raised
    />
    <Divider />
    <div>Мой личный проект :)</div>
    <br>
    <div>...</div>
  </ScrollPanel>
</template>

<script lang="ts" setup>
import ScrollPanel from 'primevue/scrollpanel';
import {Button, Divider} from 'primevue';
</script>

<style scoped></style>
