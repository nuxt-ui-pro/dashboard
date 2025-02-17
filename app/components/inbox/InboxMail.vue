<script setup lang="ts">
import { format, isToday } from 'date-fns'
import type { Mail } from '~/types'

defineProps({
  selected: {
    type: Boolean,
    default: false
  },
  mail: {
    type: Object as PropType<Mail>,
    required: true
  }
})

const emits = defineEmits(['close'])

const dropdownItems = [[{
  label: 'Mark as unread',
  icon: 'i-lucide-check-circle'
}, {
  label: 'Mark as important',
  icon: 'i-lucide-triangle-alert'
}], [{
  label: 'Star thread',
  icon: 'i-lucide-star'
}, {
  label: 'Mute thread',
  icon: 'i-lucide-circle-pause'
}]]
</script>

<template>
  <UDashboardPanel id="inbox-2" :ui="{ body: 'sm:p-0 sm:gap-0' }">
    <template #header>
      <UDashboardNavbar :toggle="false">
        <template #left>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            class="-ms-1.5"
            @click="emits('close')"
          />
          <span class="font-semibold">
            {{ mail.subject }}
          </span>
        </template>
        <template #right>
          <UTooltip text="Archive">
            <UButton
              icon="i-lucide-inbox"
              color="neutral"
              variant="ghost"
            />
          </UTooltip>

          <div>
            <UTooltip text="Reply">
              <UButton icon="i-lucide-reply" color="neutral" variant="ghost" />
            </UTooltip>
            <UDropdownMenu :items="dropdownItems">
              <UButton
                icon="i-lucide-ellipsis-vertical"
                color="neutral"
                variant="ghost"
              />
            </UDropdownMenu>
          </div>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex justify-between max-sm:pb-4 sm:p-4 border-b border-(--ui-border)">
        <div class="flex items-start gap-4">
          <UAvatar
            v-bind="mail.from.avatar"
            :alt="mail.from.name"
            size="lg"
          />

          <div class="min-w-0">
            <p class="font-semibold">
              {{ mail.from.name }}
            </p>
            <p class="text-(--ui-text-dimmed) mt-1">
              {{ mail.from.email }}
            </p>
            <p class="text-(--ui-text-dimmed) font-medium text-xs">
              {{ new Date(mail.date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }) }}

              {{ isToday(new Date(mail.date)) ? format(new Date(mail.date), 'HH:mm') : format(new Date(mail.date), 'dd MMM') }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex-1 sm:p-4">
        <p>
          {{ mail.body }}
        </p>
      </div>

      <UPageCard class="sm:m-4" variant="subtle" :ui="{ container: 'sm:p-4' }">
        <div class="flex items-center gap-1 text-(--ui-text-dimmed)">
          <UIcon name="i-lucide-reply" class="size-4" />
          <span class="text-xs">
            Reply to {{ mail.from.name }} ({{ mail.from.email }})
          </span>
        </div>
        <form @submit.prevent>
          <UTextarea
            color="neutral"
            variant="none"
            required
            autoresize
            size="xl"
            :rows="2"
            placeholder="Write your reply..."
            class="w-full"
          />
        </form>
        <div class="flex items-center justify-between">
          <UTooltip text="Attach file">
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-paperclip"
            />
          </UTooltip>
          <div class="flex items-center justify-end gap-2">
            <UButton
              color="neutral"
              variant="ghost"
              label="Save draft"
            />
            <UButton
              type="submit"
              color="neutral"
              label="Send"
              icon="i-lucide-send"
            />
          </div>
        </div>
      </UPageCard>
    </template>
  </UDashboardPanel>
</template>
