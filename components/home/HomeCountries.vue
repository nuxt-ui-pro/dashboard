<script setup lang="ts">
const countries = [{
  label: 'United States',
  value: 38,
  color: 'blue'
}, {
  label: 'Germany',
  value: 26,
  color: 'green'
}, {
  label: 'Canada',
  value: 18,
  color: 'red'
}, {
  label: 'France',
  value: 10,
  color: 'orange'
}, {
  label: 'Australia',
  value: 4,
  color: 'amber'
}]
</script>

<template>
  <UDashboardCard title="Top countries" description="You made sales in 20 countries this month." icon="i-heroicons-globe-alt-20-solid">
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
