<template>
  <Divider class="page-footer-divider" />
  <footer class="page-footer">
    <div>
      Nadezhda Trenogina 2025<br>
      email: {{ contacts.email }}<br>
      telegram: {{ contacts.telegram }}
    </div>
    <a href="https://github.com/smnfox/smnfox.github.io">source code</a>
  </footer>
</template>

<script setup lang="ts">
import { Divider } from 'primevue';
import {contacts} from '../constants';
</script>

<style scoped lang="scss">
.page-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-size: 12px;
  font-weight: 400;
  color: var('--p-surface-700');
}

.page-footer-divider {
  margin: 0;
}
</style>
