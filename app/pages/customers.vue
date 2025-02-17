<script setup lang="ts">
import type { TableColumn, FormSubmitEvent } from '@nuxt/ui'
import { upperFirst } from 'scule'
import * as z from 'zod'

const UAvatar = resolveComponent('UAvatar')

const schema = z.object({
  name: z.string().min(2, 'Too short'),
  email: z.string().email('Invalid email')
})
const open = ref(false)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined
})

type User = {
  id: number
  name: string
  username: string
  email: string
  avatar: { src: string }
  company: { name: string }
  address: { street: string, city: string, zip: string }
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: `New customer ${event.data.name} added`, color: 'success' })
}

const { data, status } = await useFetch<User[]>('https://jsonplaceholder.typicode.com/users', {
  transform: (data) => {
    return (
      data?.map(user => ({
        ...user,
        avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` }
      })) || []
    )
  },
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
          h('p', { class: '' }, `@${row.original.username}`)
        ])
      ])
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => row.original.company.name
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
          <UModal v-model:open="open" title="New customer" description="Add a new customer to the database">
            <UButton label="New customer" icon="i-lucide-plus" size="sm" />

            <template #body>
              <UForm
                :schema="schema"
                :state="state"
                class="space-y-4"
                @submit="onSubmit"
              >
                <UFormField label="Name" placeholder="John Doe" name="name">
                  <UInput v-model="state.name" class="w-full" />
                </UFormField>
                <UFormField label="Email" placeholder="john.doe@example.com" name="email">
                  <UInput v-model="state.email" class="w-full" />
                </UFormField>
                <div class="flex justify-end gap-2">
                  <UButton
                    label="Cancel"
                    color="neutral"
                    variant="subtle"
                    @click="open = false"
                  />
                  <UButton
                    label="Create"
                    color="primary"
                    variant="solid"
                    type="submit"
                  />
                </div>
              </UForm>
            </template>
          </UModal>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UPageCard>
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
      </UPageCard>
    </template>
  </UDashboardPanel>
</template>
