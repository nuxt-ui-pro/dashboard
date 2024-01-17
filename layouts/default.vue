<script setup lang="ts">
const toast = useToast()
const router = useRouter()
const appConfig = useAppConfig()

onMounted(() => {
  setTimeout(() => {
    toast.add({
      title: 'Your trial has expired!',
      actions: [{
        label: 'Upgrade',
        color: 'primary'
      }],
      timeout: 0
    })
  }, 2500)
})

const links = [{
  id: 'home',
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/',
  tooltip: {
    text: 'Home',
    shortcuts: ['G', 'H']
  }
}, {
  id: 'inbox',
  label: 'Inbox',
  icon: 'i-heroicons-inbox',
  to: '/inbox',
  badge: '4',
  tooltip: {
    text: 'Inbox',
    shortcuts: ['G', 'I']
  }
}, {
  id: 'users',
  label: 'Users',
  icon: 'i-heroicons-user-group',
  to: '/users',
  tooltip: {
    text: 'Users',
    shortcuts: ['G', 'U']
  }
}, {
  id: 'settings',
  label: 'Settings',
  to: '/settings',
  icon: 'i-heroicons-cog-8-tooth',
  children: [{
    label: 'General',
    to: '/settings',
    exact: true
  }, {
    label: 'Members',
    to: '/settings/members'
  }, {
    label: 'Billing',
    to: '/settings/billing'
  }],
  tooltip: {
    text: 'Settings',
    shortcuts: ['G', 'S']
  }
}]

const footerLinks = [{
  id: 'documentation',
  label: 'Documentation',
  icon: 'i-heroicons-book-open',
  to: 'https://ui.nuxt.com/pro/guide',
  target: '_blank'
}, {
  id: 'help',
  label: 'Help & Feedback',
  icon: 'i-heroicons-question-mark-circle',
  to: 'https://github.com/nuxt/ui-pro',
  target: '_blank'
}, {
  id: 'purchase',
  label: 'Buy Nuxt UI Pro',
  icon: 'i-heroicons-shopping-cart',
  to: 'https://ui.nuxt.com/pro/purchase',
  target: '_blank'
}]

const defaultColors = ref(['green', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet'].map(color => ({ label: color, chip: color, click: () => appConfig.ui.primary = color })))
const colors = computed(() => defaultColors.value.map(color => ({ ...color, active: appConfig.ui.primary === color.label })))

defineShortcuts({
  'g-h': () => router.push('/'),
  'g-i': () => router.push('/inbox'),
  'g-u': () => router.push('/users'),
  'g-s': () => router.push('/settings')
})
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :resizable="250" :min="200" :max="300">
      <UDashboardSidebar :links="links">
        <template #header>
          <!-- ~/components/TeamsDropdown.vue -->
          <TeamsDropdown />
        </template>

        <template #actions>
          <UDashboardSearchButton color="gray" variant="solid" />
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <UDashboardSidebarLinks :links="[{ label: 'Colors', draggable: true, children: colors }]" @update:links="colors => defaultColors = colors" />

        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <ClientOnly>
      <LazyUDashboardSearch :groups="[{ key: 'links', label: 'Go to', commands: [...links, ...footerLinks] }]" />

      <LazyUNotifications :ui="{ strategy: 'override', position: 'top-0 right-0' }" />
    </ClientOnly>
  </UDashboardLayout>
</template>
