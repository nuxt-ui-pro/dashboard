<script setup lang="ts">
const countries = [{
  label: 'United States',
  value: 31,
  color: 'red'
}, {
  label: 'Germany',
  value: 21,
  color: 'orange'
}, {
  label: 'Indonesia',
  value: 15,
  color: 'yellow'
}, {
  label: 'France',
  value: 10,
  color: 'green'
}, {
  label: 'Japan',
  value: 6,
  color: 'teal'
}, {
  label: 'India',
  value: 1,
  color: 'blue'
}, {
  label: 'Brazil',
  value: 1,
  color: 'indigo'
}, {
  label: 'China',
  value: 1,
  color: 'pink'
}]
</script>

<template>
  <UDashboardCard
    title="Top countries"
    description="You made sales in 20 countries this month."
    icon="i-heroicons-globe-alt-20-solid"
  >
    <div class="space-y-2">
      <UMeter
        v-for="(country, index) in countries"
        :key="index"
        :value="country.value"
        :label="country.label"
        :color="country.color"
        size="lg"
        class="flex-row-reverse items-center"
        :ui="{ label: { base: 'flex-shrink-0 w-24' }, indicator: { container: '!w-auto' }, meter: { base: 'flex-1' } }"
        indicator
      />
    </div>
  </UDashboardCard>
</template>
