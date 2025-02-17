<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'scule'
import type { User } from '~/types'

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')

const { data, status } = await useFetch<User[]>('/api/customers', {
  lazy: true
})

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h(UAvatar, {
          ...row.original.avatar,
          size: 'lg'
        }),
        h('div', undefined, [
          h('p', { class: 'font-medium text-(--ui-text-highlighted)' }, row.original.name),
          h('p', { class: '' }, `@${row.original.name}`)
        ])
      ])
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Email',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    }
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => row.original.location
  }
]

const table = useTemplateRef('table')

const columnFilters = ref([])

const columnVisibility = ref()
</script>

<template>
  <UDashboardPanel id="customers" :ui="{ body: 'sm:p-4' }">
    <template #header>
      <UDashboardNavbar title="Customers">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <AddCustomer />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex justify-between">
        <UInput
          :model-value="table?.tableApi?.getColumn('email')?.getFilterValue() as string"
          class="max-w-sm"
          placeholder="Filter emails..."
          @update:model-value="table?.tableApi?.getColumn('email')?.setFilterValue($event)"
        />
        <UDropdownMenu
          :items="
            table?.tableApi
              ?.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => ({
                label: upperFirst(column.id),
                type: 'checkbox' as const,
                checked: column.getIsVisible(),
                onUpdateChecked(checked: boolean) {
                  table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                },
                onSelect(e?: Event) {
                  e?.preventDefault()
                }
              }))
          "
          :content="{ align: 'end' }"
        >
          <UButton
            label="Display"
            color="neutral"
            variant="outline"
            trailing-icon="i-lucide-settings-2"
          />
        </UDropdownMenu>
      </div>

      <UTable
        ref="table"
        v-model:column-filters="columnFilters"
        v-model:column-visibility="columnVisibility"
        class="shrink-0"
        :data="data"
        :columns="columns"
        :loading="status === 'pending'"
        :ui="{
          base: 'table-fixed border-separate border-spacing-0',
          thead: '[&>tr]:bg-(--ui-bg-elevated)/50 [&>tr]:after:content-none',
          tbody: '[&>tr]:last:[&>td]:border-b-0',
          th: 'first:rounded-l-[calc(var(--ui-radius)*2)] last:rounded-r-[calc(var(--ui-radius)*2)] border-y border-(--ui-border) first:border-l last:border-r',
          td: 'border-b border-(--ui-border)'
        }"
      />
    </template>
  </UDashboardPanel>
</template>
