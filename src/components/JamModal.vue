<template>
  <ScrollPanel>
    <div>Web клиент для общения с AI ассистентом</div>
    <br>
    <Divider />
    <div>Это часть нашего с мужем домашнего проекта по разработке AI ассистента.</div>
    <div>Репозиторий временно не доступен, так как в нем есть личные данные, но при общении могу поделиться кодом и показать сервис.</div>
    <br>
    <div>Стек: Vue3 + Typescript + Pinia + Vite + PrimeVue + Vue Router</div>
    <br>
    <Image
      src="/assets/aiassistant.png"
      class="modal__image"
      width="100%"
      alt="Чат с ассистентом"
      preview
    />
    <br>
    <br>
    <div>Недавно у нас появилась амбициозная идея создать свою версию Алисы и теперь мы активно этим занимаемся :)</div>
    <div>Я выбрала языковую модель - Gemma 3 от google, среди доступных на сегодняшний день она лучше всего "общается" на русском языке. Модель запущена и работает локально у нас дома, муж разрабатывает локальный сервер для доступа к модели по http, а я веб клиент.</div>
    <br>
    <div>Из интересных деталей этого проекта - получение ответа нейросети через Streams API, раньше я такой формат взаимодействия с сервером не использовала, только классические rest api запросы и websocket. А тут нейросеть позволяет получить резльтат сразу, но данные ответа выдает постепенно в процессе генерации разделяя сообщение на токены. Таким образом даже очень длинный текст можно не ждать, а сразу видеть как нейросеть "печатает" ответ.</div>
  </ScrollPanel>
</template>

<script lang="ts" setup>
import ScrollPanel from 'primevue/scrollpanel';
import {Divider, Image} from 'primevue';
</script>

<style scoped>
.modal__image {
  width: 50%;
}
</style>