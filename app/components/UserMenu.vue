<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  collapsed?: boolean
}>()
const { locale: current, setLocale, locales, t } = useI18n()

const localesDropdownItems = computed(() => {
  const iconMap = {
    en: '🇬🇧',
    es: '🇪🇸',
    fr: '🇫🇷'
  }
  return locales.value.map(locale => ({
    label: `${iconMap[locale.code] || ''} ${locale.name}`,
    type: 'checkbox',
    checked: locale.code === current.value,
    onSelect: async (e: Event) => {
      e.preventDefault()
      current.value = locale.code
    }
  }))
})
watch(current, (newLocale: 'en' | 'es' | 'fr') => {
  setLocale(newLocale)
})

const colorMode = useColorMode()
const appConfig = useAppConfig()

const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
const neutrals = ['slate', 'gray', 'zinc', 'neutral', 'stone']

const user = ref({
  name: 'Benjamin Canac',
  avatar: {
    src: 'https://github.com/benjamincanac.png',
    alt: 'Benjamin Canac'
  }
})

const items = computed<DropdownMenuItem[][]>(() => ([[{
  type: 'label',
  label: user.value.name,
  avatar: user.value.avatar
}], [{
  label: t('userMenu.profile'),
  icon: 'i-lucide-user'
}, {
  label: t('userMenu.billing'),
  icon: 'i-lucide-credit-card'
}, {
  label: t('userMenu.settings'),
  icon: 'i-lucide-settings',
  to: '/settings'
}], [{
  label: t('userMenu.theme'),
  icon: 'i-lucide-palette',
  children: [{
    label: t('userMenu.primary'),
    slot: 'chip',
    chip: appConfig.ui.colors.primary,
    content: {
      align: 'center',
      collisionPadding: 16
    },
    children: colors.map(color => ({
      label: t(`colors.${color}`),
      chip: color,
      slot: 'chip',
      checked: appConfig.ui.colors.primary === color,
      type: 'checkbox',
      onSelect: (e) => {
        e.preventDefault()

        appConfig.ui.colors.primary = color
      }
    }))
  }, {
    label: t('userMenu.neutral'),
    slot: 'chip',
    chip: appConfig.ui.colors.neutral,
    content: {
      align: 'end',
      collisionPadding: 16
    },
    children: neutrals.map(color => ({
      label: t(`colors.${color}`),
      chip: color,
      slot: 'chip',
      type: 'checkbox',
      checked: appConfig.ui.colors.neutral === color,
      onSelect: (e) => {
        e.preventDefault()

        appConfig.ui.colors.neutral = color
      }
    }))
  }]
}, {
  label: t('userMenu.appearance'),
  icon: 'i-lucide-sun-moon',
  children: [{
    label: t('userMenu.system'),
    icon: 'i-lucide-monitor',
    type: 'checkbox',
    checked: colorMode.preference === 'system',
    onUpdateChecked(checked: boolean) {
      if (checked) {
        colorMode.preference = 'system'
      }
    },
    onSelect(e: Event) {
      e.preventDefault()
    }
  }, {
    label: t('userMenu.light'),
    icon: 'i-lucide-sun',
    type: 'checkbox',
    checked: colorMode.preference === 'light',
    onUpdateChecked(checked: boolean) {
      if (checked) {
        colorMode.preference = 'light'
      }
    },
    onSelect(e: Event) {
      e.preventDefault()
    }
  }, {
    label: t('userMenu.dark'),
    icon: 'i-lucide-moon',
    type: 'checkbox',
    checked: colorMode.preference === 'dark',
    onUpdateChecked(checked: boolean) {
      if (checked) {
        colorMode.preference = 'dark'
      }
    },
    onSelect(e: Event) {
      e.preventDefault()
    }
  }]
}, {
  label: t('userMenu.language'),
  icon: 'i-lucide-languages',
  children: localesDropdownItems.value
}], [{
  label: t('userMenu.templates'),
  icon: 'i-lucide-layout-template',
  children: [{
    label: t('userMenu.starter'),
    to: 'https://ui-pro-starter.nuxt.dev/'
  }, {
    label: t('userMenu.landing'),
    to: 'https://landing-template.nuxt.dev/'
  }, {
    label: t('userMenu.docs'),
    to: 'https://docs-template.nuxt.dev/'
  }, {
    label: t('userMenu.saas'),
    to: 'https://saas-template.nuxt.dev/'
  }, {
    label: t('userMenu.dashboard'),
    to: 'https://dashboard-template.nuxt.dev/',
    checked: true,
    type: 'checkbox'
  }, {
    label: 'Chat',
    to: 'https://chat-template.nuxt.dev/'
  }]
}], [{
  label: t('userMenu.documentation'),
  icon: 'i-lucide-book-open',
  to: 'https://ui.nuxt.com/getting-started/installation/pro/nuxt',
  target: '_blank'
}, {
  label: t('userMenu.github'),
  icon: 'i-simple-icons-github',
  to: 'https://github.com/nuxt-ui-pro/dashboard',
  target: '_blank'
}, {
  label: t('userMenu.upgrade'),
  icon: 'i-lucide-rocket',
  to: 'https://ui.nuxt.com/pro/purchase',
  target: '_blank'
}], [{
  label: t('userMenu.logout'),
  icon: 'i-lucide-log-out'
}]]))
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        ...user,
        label: collapsed ? undefined : user?.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{
        trailingIcon: 'text-dimmed'
      }"
    />

    <template #chip-leading="{ item }">
      <span
        :style="{ '--chip': `var(--color-${(item as any).chip}-400)` }"
        class="ms-0.5 size-2 rounded-full bg-(--chip)"
      />
    </template>
  </UDropdownMenu>
</template>
