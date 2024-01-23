<template>
  <VueApexCharts width="100%" height="450px" :options="options" :series="series" />
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'

const colorMode = useColorMode()

const options = computed<ApexOptions>(() => ({
  theme: {
    mode: colorMode.value === 'dark' ? 'dark' : 'light',
    palette: 'palette2'
  },
  dataLabels: {
    enabled: false
  },
  chart: {
    type: 'area',
    background: colorMode.value === 'dark' ? '#111827' : '#fff',
    toolbar: {
      show: false
    }
  },
  legend: {
    show: false
  },
  grid: {
    show: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    axisBorder: {
      show: false
    },
    // axisTicks: {
    //   show: false
    // },
    // labels: {
    //   show: false
    // },
    type: 'datetime',
    categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z', '2018-09-19T04:30:00.000Z', '2018-09-19T05:30:00.000Z', '2018-09-19T06:30:00.000Z']
  },
  yaxis: {
    axisBorder: {
      show: false
    },
    labels: {
      show: false
    }
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    }
  }
}))

const series = [{
  name: 'series1',
  data: [31, 40, 28, 51, 42, 109, 100]
}, {
  name: 'series2',
  data: [11, 32, 45, 32, 34, 52, 41]
}]
</script>
