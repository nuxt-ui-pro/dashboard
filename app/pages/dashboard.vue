<script setup lang="ts">
import { useRouter } from 'vue-router'
import DcChart from '~/components/DcChart.vue'

const router = useRouter()

const dataPath = '/data/'
const data = 'covid19-data-2021-02-28.csv'
// const data = 'test-lunch.csv'
const selectableData = {
  'covid19-japan.jpg': 'covid19-data-2021-02-28.csv',
  'food-ramen.jpg': 'food-ramen.csv',
  'ja-quake-noto-safety.jpg': 'ja-quake-noto-safety.csv',
  'ja-tokyo-gubernatorial-election.jpg': 'ja-tokyo-gubernatorial-election.csv',
  'resas-agriculture.jpg': 'resas-agriculture.csv',
  'resas-product-sales.jpg': 'resas-product-sales.csv',
  'resas-tourism-foreigners.jpg': 'resas-tourism-foreigners.csv',
  'resas-municipality-company.jpg': 'resas-municipality-company.csv',
  'resas-municipality-taxes.jpg': 'resas-municipality-taxes.csv',
  'resas-municipality-manufacture.jpg': 'resas-municipality-manufacture.csv',
  'game-1983-msx.jpg': 'game-msx.csv',
  'game-1983-fc.jpg': 'game-fc.csv',
  'game-1987-pce.jpg': 'game-pce.csv',
  'game-1988-smd.jpg': 'game-smd.csv',
  'game-1989-gb.jpg': 'game-gb.csv',
  'game-1990-smc.jpg': 'game-smc.csv',
  'game-1991-gen4.jpg': 'game-gen4.csv',
  'game-1994-ps1.jpg': 'game-ps1.csv',
  'game-1995-ss.jpg': 'game-ss.csv',
  'game-1996-n64.jpg': 'game-n64.csv',
  'game-2001-gba.jpg': 'game-gba.csv',
  'game-2001-gc.jpg': 'game-gc.csv',
  'game-gen3.jpg': 'game-gen3.csv',
  'game-ac.jpg': 'game-ac.csv',
  'test-article-like.jpg': 'test-article-like.csv',
  'test-drink.jpg': 'test-drink.csv',
  'test-lunch.jpg': 'test-lunch.csv',
  'test-agr-kikurage.jpg': 'test-agr-kikurage.csv',
  'sports-hsb.jpg': 'sports-hsb.csv',
  'store-cnt.jpg': 'store-cnt.csv',
  'store-di.jpg': 'store-di.csv',
  'kaggle-heart-disease.jpg': 'kaggle-heart-disease.csv',
  "kaggle-countries-intermediate.jpg": "kaggle-countries-intermediate.csv"
}

function reloadWithUrlSwitch(url) {
  router.push('/settings/notifications').then(() => {
    setTimeout(() => {
      router.replace(url)
    }, 5)
  })
}

const items = [
  Object.entries(selectableData).map(([key, value]) => ({
    label: key.replace('.jpg', ''), // 拡張子を除去
    icon: 'i-heroicons-chart-bar', // 固定のアイコン
    onSelect: () => reloadWithUrlSwitch(`/dashboard?data=${value}`) // 動的URL
  }))
]
</script>

<template>
  <UDashboardPanel id="dashboard">
    <template #header>
      <UDashboardNavbar title="Dashboard" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse/>
        </template>

        <template #right>
          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-folder-open" size="md" class="rounded-full" title="Select the data for the chart"/>
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>

    </template>

    <template #body>
      <DcChart :data-path="dataPath" :data="data" :selectable-data="selectableData"/>
    </template>
  </UDashboardPanel>
</template>

<style>
#dashboard-panel-dashboard > div.flex-col {
  padding: 0 !important;
}
</style>
