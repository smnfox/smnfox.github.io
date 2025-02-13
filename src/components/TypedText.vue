<template>
  <div class="container">
    <span class="typed-text">{{ typeValue }}</span>
    <span class="cursor" :class="{'typing': typeStatus}">&nbsp;</span>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import sounds from '../services/sounds';
import { getRandomInt } from '../helpers';

const typeValue = ref('');
const typeStatus = ref(false);
const typingSpeed = 300;
const erasingSpeed = 100;
const newTextDelay = 2000;
const charIndex = ref(0);
const textArrayIndex = ref(0);
const typingTimeout = ref(0);

const { texts } = defineProps({
  texts: Array<String>
});

const typeText = () => {
  if (charIndex.value < texts[textArrayIndex.value].length) {
    if(!typeStatus.value) {
      typeStatus.value = true;
    }

    typeValue.value += texts[textArrayIndex.value].charAt(charIndex.value);
    charIndex.value += 1;

    sounds.playSound('click');
    typingTimeout.value = setTimeout(typeText, typingSpeed + getRandomInt(100));
  } else {
    typeStatus.value = false;
    typingTimeout.value = setTimeout(eraseText, newTextDelay);
  }
};

const eraseText = () => {
    if (charIndex.value > 0) {
      if (!typeStatus.value) {
        typeStatus.value = true;
      }

      typeValue.value = texts[textArrayIndex.value].substring(0, charIndex.value - 1);
      charIndex.value -= 1;

      //sounds.playSound('click');
      typingTimeout.value = setTimeout(eraseText, erasingSpeed);
    } else {
      typeStatus.value = false;
      textArrayIndex.value++;
      if (textArrayIndex.value >= texts.length) {
        textArrayIndex.value = 0;
      }
      typingTimeout.value = setTimeout(typeText, typingSpeed + 1000);
    }
};

onMounted(() => {
  typingTimeout.value = setTimeout(typeText, newTextDelay);
});

onBeforeUnmount(() => {
  clearTimeout(typingTimeout.value);
});
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    font-size: 36px;
    font-weight: 700;

    span.typed-text {
      color: #021024;
    }

    span.cursor {
      display: inline-block;
      margin-left: 3px;
      width: 4px;
      background-color: #021024;
      animation: cursorBlink 1s infinite;
    }

    span.cursor.typing {
      animation: none;
    }
  }

  @keyframes cursorBlink {
    49% { background-color: #021024; }
    50% { background-color: transparent; }
    99% { background-color: transparent; }
  }
</style>
