<script setup lang="ts">
// const route = useRoute()
// const appConfig = useAppConfig()
const { isHelpSlideoverOpen } = useDashboard()

const links = [[{
  id: 'home',
  label: 'Home',
  icon: 'i-lucide-home',
  to: '/',
  tooltip: {
    text: 'Home',
    shortcuts: ['G', 'H']
  }
}, {
  id: 'inbox',
  label: 'Inbox',
  icon: 'i-lucide-inbox',
  to: '/inbox',
  badge: '4',
  tooltip: {
    text: 'Inbox',
    shortcuts: ['G', 'I']
  }
}, {
  id: 'users',
  label: 'Users',
  icon: 'i-lucide-users',
  to: '/users',
  tooltip: {
    text: 'Users',
    shortcuts: ['G', 'U']
  }
}, {
  id: 'settings',
  label: 'Settings',
  to: '/settings',
  icon: 'i-lucide-settings',
  defaultOpen: true,
  children: [{
    label: 'General',
    to: '/settings',
    exact: true
  }, {
    label: 'Members',
    to: '/settings/members'
  }, {
    label: 'Notifications',
    to: '/settings/notifications'
  }],
  tooltip: {
    text: 'Settings',
    shortcuts: ['G', 'S']
  }
}], [{
  label: 'Feedback',
  icon: 'i-lucide-message-circle',
  to: 'https://github.com/nuxt-ui-pro/dashboard/issues',
  target: '_blank'
}, {
  label: 'Help & Support',
  icon: 'i-lucide-info',
  click: () => isHelpSlideoverOpen.value = true
}]]

// const groups = [{
//   key: 'links',
//   label: 'Go to',
//   commands: links.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts }))
// }, {
//   key: 'code',
//   label: 'Code',
//   commands: [{
//     id: 'source',
//     label: 'View page source',
//     icon: 'i-simple-icons-github',
//     click: () => {
//       window.open(`https://github.com/nuxt-ui-pro/dashboard/blob/v1/pages${route.path === '/' ? '/index' : route.path}.vue`, '_blank')
//     }
//   }]
// }]
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar
      collapsible
      resizable
      :ui="{ footer: 'border-t border-(--ui-border)' }"
    >
      <template #header="{ collapsed }">
        <TeamsDropdown :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UButton
          :label="collapsed ? undefined : 'Search...'"
          icon="i-lucide-search"
          color="neutral"
          variant="subtle"
          block
          :square="collapsed"
        >
          <template
            v-if="!collapsed"
            #trailing
          >
            <div class="flex items-center gap-0.5 ms-auto">
              <UKbd
                value="meta"
                variant="subtle"
              />
              <UKbd
                value="K"
                variant="subtle"
              />
            </div>
          </template>
        </UButton>

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserDropdown :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <slot />

    <!-- <HelpSlideover />
    <NotificationsSlideover /> -->
  </UDashboardGroup>
</template>
