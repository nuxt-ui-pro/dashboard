<script setup lang="ts">
const route = useRoute()
const toast = useToast()
const { t } = useI18n()

const open = ref(false)

const links = computed(() => [[{
  label: t('layout.navigation.home'),
  icon: 'i-lucide-house',
  to: '/',
  onSelect: () => {
    open.value = false
  }
}, {
  label:  t('layout.navigation.inbox'),
  icon: 'i-lucide-inbox',
  to: '/inbox',
  badge: '4',
  onSelect: () => {
    open.value = false
  }
}, {
  label: t('layout.navigation.customers'),
  icon: 'i-lucide-users',
  to: '/customers',
  onSelect: () => {
    open.value = false
  }
}, {
  label: t('layout.navigation.settings'),
  to: '/settings',
  icon: 'i-lucide-settings',
  defaultOpen: true,
  children: [{
    label: t('layout.navigation.general'),
    to: '/settings',
    exact: true,
    onSelect: () => {
      open.value = false
    }
  }, {
    label: t('layout.navigation.members'),
    to: '/settings/members',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: t('layout.navigation.notifications'),
    to: '/settings/notifications',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: t('layout.navigation.security'),
    to: '/settings/security',
    onSelect: () => {
      open.value = false
    }
  }]
}], [{
  label: t('layout.navigation.feedback'),
  icon: 'i-lucide-message-circle',
  to: 'https://github.com/nuxt-ui-pro/dashboard',
  target: '_blank'
}, {
  label: t('layout.navigation.help'),
  icon: 'i-lucide-info',
  to: 'https://github.com/nuxt/ui-pro',
  target: '_blank'
}]])

const groups = computed(() => [{
  id: 'links',
  label: t('layout.search.goTo'),
  items: links
}, {
  id: 'code',
  label: t('layout.search.code'),
  items: [{
    id: 'source',
    label: t('layout.search.viewSource'),
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-pro/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title: t('layout.cookies.title'),
    duration: 0,
    close: false,
    actions: [{
      label: t('layout.cookies.accept'),
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        cookie.value = 'accepted'
      }
    }, {
      label: t('layout.cookies.optOut'),
      color: 'neutral',
      variant: 'ghost'
    }]
  })
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-(--ui-bg-elevated)/25"
      :ui="{ footer: 'lg:border-t lg:border-(--ui-border)' }"
    >
      <template #header="{ collapsed }">
        <TeamsMenu :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-(--ui-border)" />

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
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
