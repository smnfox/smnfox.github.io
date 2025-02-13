<template>
    <div class="header">
        <router-link to="/">
            <img
                src="../assets/avatar.jpg"
                class="header__avatar"
            />
        </router-link>
        <div class="header__menu">
            <router-link
                v-for="route in $router.options.routes"
                :key="route.path"
                :to="route.path"
                class="header__menu-link"
                :class="{ 'menu__link--active': route.path === $router.currentRoute.path }"
            >
                {{ route.name }}
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.header {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    border: 1px solid #7da0ca;
    border-radius: 0 0 10px 10px;
    position: relative;
    top: -2px;
    box-shadow: 0 3px 1px -2px #0003, 0 2px 2px 0 #00000024, 0 1px 5px 0 #0000001f;

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
}
</style>
