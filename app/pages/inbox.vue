<script setup lang="ts">
import type { Mail } from '~/types'

const tabItems = [{
  label: 'All',
  value: 'all'
}, {
  label: 'Unread',
  value: 'unread'
}]
const selectedTab = ref('all')

const { data: mails } = await useFetch<Mail[]>('/api/mails', { default: () => [] })

// Filter mails based on the selected tab
const filteredMails = computed(() => {
  if (selectedTab.value === 'unread') {
    return mails.value.filter(mail => !!mail.unread)
  }

  return mails.value
})

const selectedMail = ref<Mail | null>()

// Reset selected mail if it's not in the filtered mails
watch(filteredMails, () => {
  if (!filteredMails.value.find(mail => mail.id === selectedMail.value?.id)) {
    selectedMail.value = null
  }
})
</script>

<template>
  <UDashboardPanel
    id="inbox-1"
    :default-size="25"
    :min-size="20"
    :max-size="30"
    resizable
  >
    <template #header>
      <UDashboardNavbar title="Inbox">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #trailing>
          <UBadge :label="filteredMails.length" variant="subtle" />
        </template>

        <template #right>
          <UTabs
            v-model="selectedTab"
            :items="tabItems"
            class="w-32"
            :content="false"
            size="xs"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <InboxList v-model="selectedMail" :mails="filteredMails" />
  </UDashboardPanel>

  <InboxMail v-if="selectedMail" v-model="selectedMail" :mail="selectedMail" />
  <div v-else class="flex-1 hidden lg:flex items-center justify-center">
    <UIcon name="i-lucide-inbox" class="size-32 text-neutral-400 dark:text-neutral-500" />
  </div>
</template>
