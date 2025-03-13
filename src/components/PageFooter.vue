<template>
  <Divider class="page-footer-divider" />
  <footer class="page-footer">
    <span>Nadezhda Trenogina 2025</span>
    <a href="https://github.com/smnfox/smnfox.github.io">source code</a>
  </footer>
</template>

<script setup lang="ts">
import { Divider } from 'primevue';
</script>

<style scoped lang="scss">
.page-footer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.page-footer-divider {
  margin: 0;
}
</style>
