<script setup lang="ts">
import { eachDayOfInterval } from 'date-fns'
import type { Period, Range } from '~/types'

const model = defineModel({
  type: String as PropType<Period>,
  required: true
})

const props = defineProps({
  range: {
    type: Object as PropType<Range>,
    required: true
  }
})

const days = computed(() => eachDayOfInterval(props.range))

const periods = computed<Period[]>(() => {
  if (days.value.length <= 8) {
    return [
      'daily'
    ]
  }

  if (days.value.length <= 31) {
    return [
      'daily',
      'weekly'
    ]
  }

  return [
    'weekly',
    'monthly'
  ]
})

// Ensure the model value is always a valid period
watch(periods, () => {
  if (!periods.value.includes(model.value)) {
    model.value = periods.value[0]
  }
})
</script>

<template>
  <USelect
    v-model="model"
    :items="periods"
    variant="ghost"
    :ui="{ value: 'capitalize', itemLabel: 'capitalize', container: 'w-32' }"
  />
</template>
