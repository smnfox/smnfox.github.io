<template>
  <div class="mobile-menu">
    <RouterLink
      v-for="route in $router.options.routes"
      :key="route.path"
      :to="route.path"
      class="mobile-menu__link"
    >
      <i :class="`pi pi-${route.meta?.icon}`" />
      {{ route.name }}
    </RouterLink>
    <div class="mobile-menu__link">
      <i class="pi pi-phone" />
      Контакты
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@use '../styles/breakpoints' as *;

.mobile-menu {
  @include break-to(m, l) using($br-name) {
    display: none;
  }

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  border-radius: var(--p-border-radius-xl) var(--p-border-radius-xl) 0 0;
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);

  &__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 0;
    padding: 8px;
    gap: 4px;
    cursor: pointer;
    color: var(--p-text-color);
  }
}
</style>
