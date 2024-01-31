<script setup lang="ts">
const links = [[{
    label: 'General',
    to: '/settings',
    exact: true
  }, {
    label: 'Members',
    to: '/settings/members'
  }, {
    label: 'Billing',
    to: '/settings/billing'
  }]]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel>
      <UDashboardNavbar title="Settings" />

      <UDashboardToolbar class="py-0">
        <UHorizontalNavigation :links="links" class="-mb-px" />
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <NuxtPage />
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
