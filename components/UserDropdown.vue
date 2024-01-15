<script setup lang="ts">
const items = [
  [{
    slot: 'account',
    label: '',
    disabled: true
  }], [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    to: '/settings'
  }, {
    label: 'Shortcuts',
    icon: 'i-heroicons-command-line'
  }], [{
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
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle'
  }]
]
</script>

<template>
  <UDropdown mode="hover" :items="items" :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }" :popper="{ strategy: 'absolute', placement: 'top' }" class="w-full">
    <template #default="{ open }">
      <UButton size="md" color="gray" variant="ghost" class="w-full py-1.5" :class="[open && 'bg-gray-50 dark:bg-gray-800']">
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" size="3xs" />

        <span class="truncate">Benjamin</span>

        <UIcon name="i-heroicons-ellipsis-vertical" class="w-4 h-4 ml-auto" />
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          ben@nuxtlabs.com
        </p>
      </div>
    </template>
  </UDropdown>
</template>
