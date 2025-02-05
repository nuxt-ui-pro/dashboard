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

// const dropdownItems = [[{
//   label: 'Mark as unread',
//   icon: 'i-heroicons-check-circle'
// }, {
//   label: 'Mark as important',
//   icon: 'i-heroicons-exclamation-circle'
// }], [{
//   label: 'Star thread',
//   icon: 'i-heroicons-star'
// }, {
//   label: 'Mute thread',
//   icon: 'i-heroicons-pause-circle'
// }]]

const { data: mails } = await useFetch<Mail[]>('/api/mails', { default: () => [] })

// Filter mails based on the selected tab
const filteredMails = computed(() => {
  if (selectedTab.value === 'unread') {
    return mails.value.filter(mail => !!mail.unread)
  }

  return mails.value
})

const selectedMail = ref<Mail | null>()

// const isMailPanelOpen = computed({
//   get() {
//     return !!selectedMail.value
//   },
//   set(value: boolean) {
//     if (!value) {
//       selectedMail.value = null
//     }
//   }
// })

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
    resizable
  >
    <template #header>
      <UDashboardNavbar title="Inbox">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #trailing>
          <UBadge
            :label="filteredMails.length"
            variant="subtle"
          />
        </template>

        <template #right>
          <UTabs
            v-model="selectedTab"
            :items="tabItems"
            class="w-36"
            :content="false"
            size="sm"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <InboxList
      v-model="selectedMail"
      :mails="filteredMails"
    />
  </UDashboardPanel>

  <UDashboardPanel id="inbox-2" />
</template>
