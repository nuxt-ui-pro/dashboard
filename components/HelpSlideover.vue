<script setup lang="ts">
const { isHelpSlideoverOpen } = useDashboard()
const { metaSymbol } = useShortcuts()

const shortcuts = ref(false)
const query = ref('')

const links = [{
  label: 'Shortcuts',
  icon: 'i-heroicons-key',
  trailingIcon: 'i-heroicons-arrow-right-20-solid',
  color: 'gray',
  onClick: () => {
    shortcuts.value = true
  }
}, {
  label: 'Documentation',
  icon: 'i-heroicons-book-open',
  to: 'https://ui.nuxt.com/pro/getting-started',
  target: '_blank'
}, {
  label: 'GitHub repository',
  icon: 'i-simple-icons-github',
  to: 'https://github.com/nuxt-ui-pro/dashboard',
  target: '_blank'
}, {
  label: 'Buy Nuxt UI Pro',
  icon: 'i-heroicons-credit-card',
  to: 'https://ui.nuxt.com/pro/purchase',
  target: '_blank'
}]

const categories = computed(() => [{
  title: 'General',
  items: [
    { shortcuts: [metaSymbol.value, 'K'], name: 'Command menu' },
    { shortcuts: ['N'], name: 'Notifications' },
    { shortcuts: ['?'], name: 'Help & Support' },
    { shortcuts: ['/'], name: 'Search' }
  ]
}, {
  title: 'Navigation',
  items: [
    { shortcuts: ['G', 'H'], name: 'Go to Home' },
    { shortcuts: ['G', 'I'], name: 'Go to Inbox' },
    { shortcuts: ['G', 'U'], name: 'Go to Users' },
    { shortcuts: ['G', 'S'], name: 'Go to Settings' }
  ]
}, {
  title: 'Inbox',
  items: [
    { shortcuts: ['↑'], name: 'Prev notification' },
    { shortcuts: ['↓'], name: 'Next notification' }
  ]
}])

const filteredCategories = computed(() => {
  return categories.value.map(category => ({
    title: category.title,
    items: category.items.filter((item) => {
      return item.name.search(new RegExp(query.value, 'i')) !== -1
    })
  })).filter(category => !!category.items.length)
})
</script>

<template>
  <UDashboardSlideover v-model="isHelpSlideoverOpen">
    <template #title>
      <UButton
        v-if="shortcuts"
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-arrow-left-20-solid"
        @click="shortcuts = false"
      />

      {{ shortcuts ? 'Shortcuts' : 'Help & Support' }}
    </template>

    <div
      v-if="shortcuts"
      class="space-y-6"
    >
      <UInput
        v-model="query"
        icon="i-heroicons-magnifying-glass"
        placeholder="Search..."
        autofocus
        color="gray"
      />

      <div
        v-for="(category, index) in filteredCategories"
        :key="index"
      >
        <p class="mb-3 text-sm text-gray-900 dark:text-white font-semibold">
          {{ category.title }}
        </p>

        <div class="space-y-2">
          <div
            v-for="(item, i) in category.items"
            :key="i"
            class="flex items-center justify-between"
          >
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ item.name }}</span>

            <div class="flex items-center justify-end flex-shrink-0 gap-0.5">
              <UKbd
                v-for="(shortcut, j) in item.shortcuts"
                :key="j"
              >
                {{ shortcut }}
              </UKbd>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col gap-y-3"
    >
      <UButton
        v-for="(link, index) in links"
        :key="index"
        color="white"
        v-bind="link"
      />
    </div>
  </UDashboardSlideover>
</template>
