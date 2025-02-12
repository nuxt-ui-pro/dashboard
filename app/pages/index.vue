<script setup lang="ts">
import { sub } from 'date-fns'
import type { Period, Range } from '~/types'

const { isNotificationsSlideoverOpen } = useDashboard()

const items = [[{
  label: 'New mail',
  icon: 'i-heroicons-paper-airplane',
  to: '/inbox'
}, {
  label: 'New user',
  icon: 'i-heroicons-user-plus',
  to: '/contacts'
}]]

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})
const period = ref<Period>('daily')
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Home">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UTooltip
            text="Notifications"
            :shortcuts="['N']"
          >
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip
                color="error"
                inset
              >
                <UIcon
                  name="i-heroicons-bell"
                  class="w-5 h-5"
                />
              </UChip>
            </UButton>
          </UTooltip>
          <UDropdownMenu :items="items">
            <UButton
              icon="i-heroicons-plus"
              size="md"
              class="ml-1.5 rounded-full"
            />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>
    </template>

    <UDashboardToolbar class="py-2">
      <template #left>
        <HomeDateRangePicker
          v-model="range"
        />
        <HomePeriodSelect
          v-model="period"
          :range="range"
        />
      </template>
    </UDashboardToolbar>

    <UPage class="p-4 overflow-y-auto">
      <HomeStats />
      <HomeChart
        :period="period"
        :range="range"
      />
      <HomeSales />
    </UPage>
  </UDashboardPanel>
</template>
