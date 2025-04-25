<script setup lang="ts">
import type { Member } from '~/types'

const { t } = useI18n()
const { data: members } = await useFetch<Member[]>('/api/members', { default: () => [] })

const q = ref('')

const filteredMembers = computed(() => {
  return members.value.filter((member) => {
    return member.name.search(new RegExp(q.value, 'i')) !== -1 || member.username.search(new RegExp(q.value, 'i')) !== -1
  })
})

const inviteMember = () => {
  useToast().add({
    title: t('members.notifications.invite.title'),
    description: t('members.notifications.invite.description'),
    color: 'success'
  })
}
</script>

<template>
  <div>
    <UPageCard
      :title="t('members.title')"
      :description="t('members.description')"
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        :label="t('members.actions.invite')"
        color="neutral"
        class="w-fit lg:ms-auto"
        @click="inviteMember"
      />
    </UPageCard>

    <UPageCard variant="subtle" :ui="{ container: 'p-0 sm:p-0 gap-y-0', header: 'p-4 mb-0 border-b border-(--ui-border)' }">
      <template #header>
        <UInput
          v-model="q"
          icon="i-lucide-search"
          :placeholder="t('members.actions.search_placeholder')"
          autofocus
          class="w-full"
        />
      </template>

      <SettingsMembersList :members="filteredMembers" />
    </UPageCard>
  </div>
</template>
