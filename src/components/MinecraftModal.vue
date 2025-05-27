<template>
  <ScrollPanel>
    <div>Web версия популярной игры minecraft</div>
    <br>
    <ButtonGroup>
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
    </ButtonGroup>
    <Divider />
    <div>Мой личный проект, чтобы набить руку в геймдеве и 3д</div>
    <br>
    <div>Стек: React19 + Typescript + Zustand + React Three Fiber + Rapier</div>
    <br>
    <div>Сейчас в игре реализовано:</div>
    <ul>
      <li>Рандомно генерируемый мир при входе в игру, но он сохраняется при обновлении страницы</li>
      <li>4 биома с разными типами деревьев и облака</li>
      <li>Туман, чтобы не было видно край мира</li>
      <li>Базовое перемещение игрока по миру и генерация чанков на основе позиции игрока, позиция сохраняется при обновлении страницы</li>
    </ul>
    <div>Проект полностью разрабатывался мной и еще многое стоит в него внедрить, в ближайших планах вода и плавание, создание/разрушение блоков, инвентарь и звуки.</div>
    <br>
    <div>Для меня испытанием было оптимизировать большое количество 3д объектов на экране, при смене чанка заметно проседал фпс. Получилось это сделать генерируя один физический объект из видимых плоскостей в чанке, вместо того, чтобы делать физическим объектом каждый видимый куб, теперь переход между чанками почти не заметен.</div>
  </ScrollPanel>
</template>

<script lang="ts" setup>
import ScrollPanel from 'primevue/scrollpanel';
import {Button, Divider, ButtonGroup} from 'primevue';
</script>

<style scoped></style>
