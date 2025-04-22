<template>
  <h2>Коммерческий опыт работы</h2>
  <Card>
    <template #content>
      <Timeline
        :value="myCompanies"
        class="experience-timeline"
      >
        <template #opposite="slotProps">
          <div class="experience-timeline__subheader">
            {{ getDateRange(slotProps.item.dateStart, slotProps.item.dateEnd) }}
          </div>
        </template>
        <template #content="slotProps">
          <div class="experience-timeline__content">
            <div class="experience-timeline__header">
              {{ slotProps.item.name }}
            </div>
            <div class="experience-timeline__subheader">
              {{ slotProps.item.position }}
            </div>
            <div class="experience-timeline__subheader">
              {{ getDateDiff(slotProps.item.dateStart, slotProps.item.dateEnd) }}
            </div>
            <div class="experience-timeline__text">
              Основной стэк: {{ slotProps.item.stack }}
            </div>
            <div class="experience-timeline__text">
              {{ slotProps.item.description }}
            </div>
            <ul class="experience-timeline__text">
              <li
                v-for="(item, index) in slotProps.item.responsibilities"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </template>
      </Timeline>
    </template>
  </Card>
</template>

<script setup lang="ts">
import {Timeline, Card} from 'primevue';
import {myCompanies} from '../constants';
import plural from 'plural-ru';

const getDateDiff = (from: string, to: string): string => {
  const dateFrom = new Date(from);
  const dateTo = new Date(to);
  const diff = dateTo.getTime() - dateFrom.getTime();
  const years = new Date(diff).getUTCFullYear() - 1970;
  const months = new Date(diff).getUTCMonth();
  const yearsString = years ? `${years} ${plural(years, 'год', 'года', 'лет')} ` : '';
  const monthsString = months ? `${months} ${plural(months, 'месяц', 'месяца', 'месяцев')}` : '';
  return `${yearsString}${monthsString}`;
};

const getDateRange = (from: string, to: string): string => {
  const dateFrom = new Date(from);
  const dateTo = new Date(to);
  const options = {
    year: 'numeric',
    month: 'long',
  };
  const dateFromString = `${dateFrom.toLocaleString('ru-RU', options).replace(/^./, str => str.toUpperCase())}`;
  const dateToString = `${dateTo.toLocaleString('ru-RU', options).replace(/^./, str => str.toUpperCase())}`;
  return `${dateFromString} - ${dateToString}`;
};
</script>

<style lang="scss" scoped>
.experience-timeline {
  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__header {
    font-size: 20px;
    font-weight: 700;
  }

  &__text {
    font-weight: 400;
  }
}

:deep(.p-timeline-event-opposite) {
  flex: 0 0 20%;
}
</style>
