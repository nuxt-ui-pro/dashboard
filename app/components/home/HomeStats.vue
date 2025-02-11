<script setup lang="ts">
const stats = [{
  title: 'Customers',
  icon: 'i-lucide-users',
  value: 543,
  variation: 13
}, {
  title: 'Conversions',
  icon: 'i-lucide-chart-pie',
  value: 1344,
  variation: -2
}, {
  title: 'Revenue',
  icon: 'i-lucide-circle-dollar-sign',
  value: (234561).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }),
  variation: 19
}, {
  title: 'Orders',
  icon: 'i-lucide-shopping-cart',
  value: 123,
  variation: 2
}]
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
    <UPageCard
      v-for="(stat, index) in stats"
      :key="index"
      :icon="stat.icon"
      :title="stat.title"
    >
      <div class="flex items-center gap-2">
        <span class="text-2xl font-semibold">
          {{ stat.value }}
        </span>
        <UBadge
          :color="stat.variation > 0 ? 'success' : 'error'"
          variant="subtle"
          size="xs"
          class="text-xs"
        >
          {{ stat.variation > 0 ? '+' : '' }}{{ stat.variation }}%
        </UBadge>
      </div>
    </UPageCard>
  </div>
</template>
