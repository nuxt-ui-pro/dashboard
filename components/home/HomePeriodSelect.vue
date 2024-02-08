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
  <USelectMenu
    v-slot="{ open }"
    v-model="model"
    :options="periods"
    :ui-menu="{ width: 'w-32', option: { base: 'capitalize' } }"
    :popper="{ placement: 'bottom-start' }"
  >
    <UButton
      :label="model"
      color="gray"
      variant="ghost"
      class="capitalize"
      :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    />
  </USelectMenu>
</template>
