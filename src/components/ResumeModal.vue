<template>
  <ScrollPanel>
    <div>Сайт портфолио</div>
    <br>
    <ButtonGroup>
      <Button
        label="Открыть"
        as="a"
        href="https://smnfox.github.io"
        target="_blank"
      />
      <Button
        label="Репозиторий"
        as="a"
        href="https://github.com/smnfox/portfolio"
        target="_blank"
      />
    </ButtonGroup>
    <Divider />
    <div>Сайт-резюме, на котором вы сейчас находитесь :)</div>
    <br>
    <div>Стек: Vue3 + Typescript + Vite + Prime Vue + Vue Router</div>
    <br>
    <div>Этот сайт я постоянно дорабатываю и так как не имею навыков в дизайне, то стараюсь, чтобы он выглядел минималистично.</div>
    <div>Функционал вы в целом уже увидели, но все же перечислю некоторые детали:</div>
    <ul>
      <li>Анимация печатающегося текста на главной</li>
      <li>Карусель с технологиями, используется библиотека splide</li>
      <li>Темная/светлая темы</li>
      <li>Адаптивный дизайн с мобильной версией</li>
      <li>Мини игра на three.js с использованием физики rapier и звуков через howler</li>
    </ul>
  </ScrollPanel>
</template>

<script lang="ts" setup>
import ScrollPanel from 'primevue/scrollpanel';
import {Button, Divider, ButtonGroup} from 'primevue';
</script>

<style scoped></style>