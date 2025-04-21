<template>
  <h1>Примеры интерфейса без использования готовых компонентов</h1>
  <div class="examples">
    <div class="example">
      pupupu
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
.examples {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.example {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 12px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  flex-grow: 1;
  max-width: calc(100% / 2 - 24px);
}
</style>
