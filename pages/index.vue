<script setup lang="ts">
const isNotificationsOpen = ref(false)
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

          <UButton icon="i-heroicons-plus" size="md" class="ml-1.5 rounded-full" />
        </template>
      </UDashboardNavbar>

      <UDashboardPageBody>
        <HomeChart />
      </UDashboardPageBody>
    </UDashboardPanel>

    <UDashboardSlideover v-model="isNotificationsOpen" title="Notifications" />
  </UDashboardPage>
</template>
