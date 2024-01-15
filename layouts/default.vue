<script setup lang="ts">
const toast = useToast()
const router = useRouter()

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

const links = computed(() => [{
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
  defaultOpen: true,
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
}])

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

const tags = [{
  label: 'Developer',
  chip: 'indigo'
}, {
  label: 'Designer',
  chip: 'emerald'
}, {
  label: 'Partner',
  chip: 'blue'
}, {
  label: 'Prospect',
  chip: 'red'
}]

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
          <TeamsDropdown />
        </template>

        <template #actions>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <UDashboardSidebarLinks :links="[{ label: 'Tags', defaultOpen: true, children: tags }]" />

        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <ClientOnly>
      <LazyUDashboardSearch :groups="[{ key: 'links', label: 'Go to', commands: [...links, ...footerLinks] }]" />

      <LazyUNotifications />
    </ClientOnly>
  </UDashboardLayout>
</template>
