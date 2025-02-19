<script setup lang="ts">
import TypedText from './TypedText.vue';

const helloTexts = [
  'Привет!',
  'Меня зовут Надя',
  'Я фронтенд разработчик :)',
];
</script>

<template>
  <TypedText :texts="helloTexts" />

  <div class="cards__wrapper">
    <div class="cards__card">
      👩🏻‍💻Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <div class="cards__card">
      <img
        src="../assets/photo.jpg"
        class="main-photo"
        alt="photo"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.cards {
  &__wrapper {
    display: flex;
    gap: 24px;
  }

  &__card {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 10px;
    display: flex;
    flex-direction: column;
    place-content: center;
    place-items: center;
  }
}

.main-photo {
  width: 200px;
  height: auto;
  border-radius: 10px;
}
</style>
