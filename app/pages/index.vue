<script setup lang="ts">
// import { sub } from 'date-fns'
// import type { Period, Range } from '~/types'

// const { isNotificationsSlideoverOpen } = useDashboard()

// const items = [[{
//   label: 'New mail',
//   icon: 'i-heroicons-paper-airplane',
//   to: '/inbox'
// }, {
//   label: 'New user',
//   icon: 'i-heroicons-user-plus',
//   to: '/users'
// }]]

// const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() })
// const period = ref<Period>('daily')
</script>

<template>
  <UDashboardPanel id="home">
    <!-- <template #header>
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
        </template>
      </UDashboardNavbar>
    </template> -->

    <UContainer class="w-full">
      <UPage class="w-full">
        <UPageHeader
          title="Home"
          description="Welcome to the home page"
        />
        <UPageBody>
          <UPageCard title="Home" />
        </UPageBody>
      </UPage>
    </UContainer>
  </UDashboardPanel>
</template>
