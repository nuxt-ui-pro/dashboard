<script setup lang="ts">
import type { Member } from '~/types'

const { data: members } = await useFetch<Member[]>('/api/members', { default: () => [] })

const q = ref('')
const isInviteModalOpen = ref(false)

const filteredMembers = computed(() => {
  return members.value.filter((member) => {
    return member.name.search(new RegExp(q.value, 'i')) !== -1 || member.username.search(new RegExp(q.value, 'i')) !== -1
  })
})
</script>

<template>
  <div class="flex gap-4 max-sm:flex-col items-start gap-4 justify-between">
    <div class="sm:sticky sm:top-2 flex sm:flex-col max-sm:items-center gap-4 max-sm:w-full justify-between">
      <div class="flex flex-col gap-1">
        <span class="text-lg font-semibold">Manage access</span>
        <span class="text-sm text-neutral-500">Invite new members by email address.</span>
      </div>
      <div>
        <UButton
          label="Invite people"
          color="neutral"
          @click="isInviteModalOpen = true"
        />
      </div>
    </div>
    <UCard
      :ui="{ header: 'p-4 sm:px-6', body: 'p-0' }"
      class="w-full sm:max-w-xl"
    >
      <template #header>
        <UInput
          v-model="q"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search members"
          autofocus
        />
      </template>

      <!-- ~/components/settings/MembersList.vue -->
      <SettingsMembersList :members="filteredMembers" />
    </UCard>
  </div>
</template>
