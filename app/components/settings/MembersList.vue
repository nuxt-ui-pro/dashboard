<script setup lang="ts">
import type { Member } from '~/types'

const { t } = useI18n()

defineProps<{
  members: Member[]
}>()

const items = computed(() => [{
  label: t('members.actions.edit'),
  onSelect: () => console.log('Edit member')
}, {
  label: t('members.actions.remove'),
  color: 'error' as const,
  onSelect: () => {
    useToast().add({
      title: t('members.notifications.removed.title'),
      description: t('members.notifications.removed.description'),
      color: 'error'
    })
  }
}])

const roles = computed(() => [
  { label: t('members.role.member'), value: 'member' },
  { label: t('members.role.owner'), value: 'owner' }
])
</script>

<template>
  <div v-if="!members?.length" class="text-center py-4">
    <p class="text-(--ui-text-dimmed)">
      {{ t('members.empty.no_members') }}
    </p>
  </div>
  <ul role="list" class="divide-y divide-default">
    <li
      v-for="(member, index) in members"
      :key="index"
      class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6"
    >
      <div class="flex items-center gap-3 min-w-0">
        <UAvatar
          v-bind="member.avatar"
          size="md"
        />

        <div class="text-sm min-w-0">
          <p class="text-highlighted font-medium truncate">
            {{ member.name }}
          </p>
          <p class="text-muted truncate">
            {{ member.username }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <USelect
          :model-value="member.role"
          :items="roles"
          color="neutral"
          :ui="{ value: 'capitalize', item: 'capitalize' }"
        />

        <UDropdownMenu :items="items" :content="{ align: 'end' }">
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
          />
        </UDropdownMenu>
      </div>
    </li>
  </ul>
</template>
