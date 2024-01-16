<script setup lang="ts">
import type { UButton } from '#build/components'

const tabItems = [{
  label: 'All'
}, {
  label: 'Unread'
}]

const dropdownItems = [[{
  label: 'Mark as unread',
  icon: 'i-heroicons-check-circle'
}, {
  label: 'Mark as important',
  icon: 'i-heroicons-exclamation-circle'
}], [{
  label: 'Star thread',
  icon: 'i-heroicons-star'
}, {
  label: 'Mute thread',
  icon: 'i-heroicons-pause-circle'
}]]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel name="inbox" :resizable="400" :min="300" :max="500">
      <UDashboardNavbar title="Inbox">
        <template #right>
          <UTabs :items="tabItems" :ui="{ wrapper: '', list: { height: 'h-9', tab: { height: 'h-7', size: 'text-[13px]' } } }" />
        </template>
      </UDashboardNavbar>
    </UDashboardPanel>

    <UDashboardPanel>
      <UDashboardNavbar>
        <template #left>
          <UTooltip text="Archive">
            <UButton icon="i-heroicons-archive-box" color="gray" variant="ghost" />
          </UTooltip>

          <UTooltip text="Move to junk">
            <UButton icon="i-heroicons-archive-box-x-mark" color="gray" variant="ghost" />
          </UTooltip>

          <UTooltip text="Move to trash">
            <UButton icon="i-heroicons-archive-box" color="gray" variant="ghost" />
          </UTooltip>

          <UDivider orientation="vertical" class="mx-1.5" />

          <UPopover :popper="{ placement: 'bottom-start' }">
            <template #default="{ open }">
              <UTooltip text="Snooze" :prevent="open">
                <UButton icon="i-heroicons-clock" color="gray" variant="ghost" :class="[open && 'bg-gray-50 dark:bg-gray-800']" />
              </UTooltip>
            </template>

            <template #panel="{ close }">
              <DatePicker @close="close" />
            </template>
          </UPopover>
        </template>

        <template #right>
          <UTooltip text="Reply">
            <UButton icon="i-heroicons-arrow-uturn-left" color="gray" variant="ghost" />
          </UTooltip>

          <UTooltip text="Forward">
            <UButton icon="i-heroicons-arrow-uturn-right" color="gray" variant="ghost" />
          </UTooltip>

          <UDivider orientation="vertical" class="mx-1.5" />

          <UDropdown :items="dropdownItems">
            <UButton icon="i-heroicons-ellipsis-vertical" color="gray" variant="ghost" />
          </UDropdown>
        </template>
      </UDashboardNavbar>
    </UDashboardPanel>
  </UDashboardPage>
</template>
