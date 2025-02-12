<script setup lang="ts">
import { format, isToday } from 'date-fns'
import type { Mail } from '~/types'

defineProps({
  mail: {
    type: Object as PropType<Mail>,
    required: true
  }
})

const selected = defineModel<Mail | null>()

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
  <UDashboardPanel :ui="{ body: 'sm:p-0 sm:gap-0' }">
    <template #header>
      <UDashboardNavbar>
        <template #left>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            class="-ms-1.5"
            @click="selected = null"
          />
          <span class="text-neutral-900 dark:text-white font-semibold">
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
      <div class="flex justify-between p-4 border-b border-(--ui-border)">
        <div class="flex items-start gap-4">
          <UAvatar
            v-bind="mail.from.avatar"
            :alt="mail.from.name"
            size="lg"
          />

          <div class="min-w-0">
            <p class="text-neutral-900 dark:text-white font-semibold">
              {{ mail.from.name }}
            </p>
            <p class="text-neutral-500 dark:text-neutral-400 mt-1">
              {{ mail.from.email }}
            </p>
            <p class="text-neutral-500 dark:text-neutral-400 font-medium text-xs">
              {{ new Date(mail.date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }) }}
            </p>
          </div>
        </div>

        <p class="font-medium text-neutral-900 dark:text-white">
          {{ isToday(new Date(mail.date)) ? format(new Date(mail.date), 'HH:mm') : format(new Date(mail.date), 'dd MMM') }}
        </p>
      </div>

      <div class="flex-1 p-4">
        <p>
          {{ mail.body }}
        </p>
      </div>

      <UPageCard class="m-4" variant="subtle" :ui="{ container: 'sm:p-4' }">
        <div class="flex items-center gap-1 text-neutral-500">
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
            :rows="5"
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
