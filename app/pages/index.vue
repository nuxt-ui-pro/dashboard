<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Dashboard">
        <template #leading="{ sidebarCollapsed, collapseSidebar, expandSidebar }">
          <UButton
            :icon="sidebarCollapsed.value ? 'i-lucide-panel-left-open' : 'i-lucide-panel-left-close'"
            color="neutral"
            variant="ghost"
            class="hidden lg:flex -ms-1.5"
            @click="sidebarCollapsed.value ? expandSidebar() : collapseSidebar()"
          />
        </template>

        <template #right>
          <UColorModeButton class="-me-1.5" />
        </template>
      </UDashboardNavbar>
    </template>
  </UDashboardPanel>
</template>
