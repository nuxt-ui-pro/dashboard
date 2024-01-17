<script setup lang="ts">
const isNotificationsOpen = ref(false)

const items = [[{
  label: 'New mail',
  icon: 'i-heroicons-paper-airplane',
  to: '/inbox'
}, {
  label: 'New user',
  icon: 'i-heroicons-user-plus',
  to: '/users'
}]]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel>
      <UDashboardNavbar title="Home">
        <template #right>
          <UButton color="gray" variant="ghost" square @click="isNotificationsOpen = true">
            <UChip color="red" inset>
              <UIcon name="i-heroicons-bell" class="w-5 h-5" />
            </UChip>
          </UButton>

          <UDropdown :items="items">
            <UButton icon="i-heroicons-plus" size="md" class="ml-1.5 rounded-full" />
          </UDropdown>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <HomeDateRangePicker />
        </template>
      </UDashboardToolbar>

      <UDashboardPageBody>
        <Chart />
      </UDashboardPageBody>
    </UDashboardPanel>

    <UDashboardSlideover v-model="isNotificationsOpen" title="Notifications" />
  </UDashboardPage>
</template>
